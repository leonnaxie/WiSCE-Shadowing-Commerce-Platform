import { NextResponse } from "next/server";
import pool from "@/db/databasepg";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { email, password, username } = await req.json();

        if (!email || !password || !username) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        const existing = await pool.query(
            "SELECT id FROM users WHERE email= $1",
            [email]
        );

        if (existing.rows.length > 0 ) {
            return NextResponse.json(
                { error: "Email already exists." },
                { status: 400 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (email, password_hash, username, address, orders_placed)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, username, address, orders_placed`,
            [email, passwordHash, username, "", 0]
        );

        const user = result.rows[0];

        const sessionId = crypto.randomBytes(32).toString("hex");
        await pool.query(
            "INSERT INTO sessions (session_id, user_id) VALUES ($1, $2)",
            [sessionId, user.id]
        );


        const res = NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.username,
            address: user.address,
            orders_placed: user.orders_placed
        }, { status: 201 });
        
        res.cookies.set("sessionId", sessionId, {
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60
        });

        return res;
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Signup failed" },
            { status: 500 }
        );
    }
}