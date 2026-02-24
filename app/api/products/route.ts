import { NextResponse } from "next/server";
import pool from "@/db/databasepg";

export async function GET() {
    const result = await pool.query("SELECT * FROM products");
    return NextResponse.json(result.rows);
}