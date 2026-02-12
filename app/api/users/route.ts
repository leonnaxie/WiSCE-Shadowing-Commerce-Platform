import { NextResponse } from "next/server";
import pool from "@/db/databasepg";
import bcrypt from "bcrypt";

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
            `INSERT INTO users (email, password_hash, username)
            VALUES ($1, $2, $3)
            RETURNING id, email, username`,
            [email, passwordHash, username]
        );

        return NextResponse.json(result.rows[0], { status: 201 });    
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Signup failed" },
            { status: 500 }
        );
    }
}