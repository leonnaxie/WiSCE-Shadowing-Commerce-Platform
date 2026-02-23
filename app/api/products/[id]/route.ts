import { NextResponse } from "next/server";
import pool from "@/db/databasepg";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }>}
) {
    try {
        const { id } = await params;

        const result = await pool.query(
            "SELECT * FROM products WHERE product_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}