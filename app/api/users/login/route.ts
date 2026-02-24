import { NextResponse } from "next/server";
import pool from "@/db/databasepg";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { usernameOrEmail, password } = await req.json();

        if (!usernameOrEmail || !password ) {
            return NextResponse.json(
                { error: "Missing credentials." },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `SELECT id, email, password_hash, username, address, orders_placed
            FROM users
            WHERE email = $1 OR username = $1`,
            [usernameOrEmail]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password_hash);

        if (!valid) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

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
        });
        res.cookies.set("sessionId", sessionId, {
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return res;
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Login failed" },
            { status: 500 }
        );
    }
}