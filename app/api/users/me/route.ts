import { NextResponse } from "next/server";
import pool from "@/db/databasepg";

export async function GET(req: Request) {
    const cookie = req.headers.get("cookie") || "";
    const sessionId = cookie.match(/sessionId=([a-zA-Z0-9]+)/)?.[1];

    if (!sessionId) {
        return NextResponse.json({ error: "Not authenticated"}, { status: 401 });
    }

    const sessionResult = await pool.query(
        "SELECT user_id FROM sessions WHERE session_id=$1",
        [sessionId]
    );
    if (sessionResult.rows.length === 0) {
        return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const userResult = await pool.query(
        "SELECT id, username AS name, email, address, orders_placed FROM users WHERE id=$1",
        [sessionResult.rows[0].user_id]
    );

    if (userResult.rows.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("GET /api/users/me - User data:", userResult.rows[0]);

    return NextResponse.json(userResult.rows[0]);
}



export async function PUT(req: Request) {
    try {
        const cookie = req.headers.get("cookie") || "";
        const sessionId = cookie.match(/sessionId=([a-zA-Z0-9]+)/)?.[1];

        if (!sessionId) {
            return NextResponse.json({ error: "Could not be authenticated"}, { status: 401 });
        }

        const sessionRes = await pool.query(
            "SELECT user_id FROM sessions WHERE session_id=$1",
            [sessionId]
        );
        if (sessionRes.rows.length === 0) {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        const userId = sessionRes.rows[0].user_id;
        const { name, email, address } = await req.json();

        console.log("PUT /api/users/me - Updating User:", userId);
        console.log("Data received:", { name, email, address });

        const updateRes = await pool.query(
            `UPDATE users
            SET username = $1,
            email = $2,
            address = $3
            WHERE id = $4
            RETURNING id, username AS name, email, address, orders_placed`,
            [name, email, address, userId]
        );

        console.log("Update result:", updateRes.rows[0]);

        return NextResponse.json(updateRes.rows[0]);
    } catch (err) {
        console.error("PUT /api/users/me error:", err);
        return NextResponse.json({ error: "update failed"}, { status: 500});
    }
}