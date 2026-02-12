import { NextResponse } from "next/server";
import pool from "@/db/databasepg";
import bcrypt from "bcrypt";

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
            `SELECT id, email, password_hash, username
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

        return NextResponse.json({
            id: user.id,
            email: user.email,
            username: user.username,
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Login failed" },
            { status: 500 }
        );
    }
}