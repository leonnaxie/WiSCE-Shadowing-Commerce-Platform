import { NextResponse } from "next/server";
import pool from "@/db/databasepg";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                                process.env.GOOGLE_CLIENT_SECRET,
                                'postmessage');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { code } = body;

        console.log("Google Login Debug");
        console.log("Code received", code ? "Yes" : "no");
        console.log("Client ID exists", !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
        console.log("Client Secret exists", !!process.env.GOOGLE_CLIENT_SECRET);

        if (!code) {
            return NextResponse.json({ error: "Missing auth code"}, { status: 400 });
        }

        const { tokens } = await client.getToken(code);
        if (!tokens.id_token) {
            return NextResponse.json({ error: "No ID token received"}, { status: 400 });
        }

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return NextResponse.json({ error: "invalid token payload"}, { status: 400 });
        }

        const { email, name } = payload;
        const userResult = await pool.query(
            "SELECT id, username, email FROM users WHERE email=$1",
            [email]
        );


        let user;

        if (userResult.rows.length > 0) {
            user = userResult.rows[0];
            console.log("existing user logged in", user.id);
        } else {
            const randomPassword = crypto.randomBytes(16).toString("hex");
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            const username = name?.replace(/\s+/g, "").toLowerCase() || email?.split("@")[0];

            try {
                const insertResult = await pool.query(
                "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
                [username, email, hashedPassword]
                );
                user = insertResult.rows[0];
                console.log("new user created", user.id);
            } catch (err) {
                console.log(err);
            }
        }

        const sessionId = crypto.randomBytes(32).toString("hex");
        await pool.query(
            "INSERT INTO sessions (session_id, user_id) VALUES ($1, $2)",
            [sessionId, user.id]
        );

        const response = NextResponse.json({
            id: user.id,
            username: user.username,
            email: user.email
        });

        response.cookies.set("sessionId", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        });

        return response;
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Something went wrong "}, { status: 500 });
    }
}