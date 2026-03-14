import { NextResponse } from "next/server";
import pool from "@/db/databasepg";

export async function POST(req: Request) {
    const client = await pool.connect();

    try {
        const body = await req.json();
        const { customerId, shippingAddress, paymentMethod, email, items, sendEmail } = body;
        
        if (!shippingAddress || !paymentMethod || !email || !items?.length) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }
        
        await client.query("BEGIN");
        const orderResult = await client.query(
            `INSERT INTO orders
            (customer_id, order_date, status, total_price, shipping_address, payment_method, email, send_email)
            VALUES ($1, NOW(), $2, $3, $4, $5, $6, $7)
            RETURNING order_id`,
            [customerId || null,
            "pending",
            0,
            shippingAddress,
            paymentMethod,
            email,
            sendEmail ?? false]
        );
        const orderId = orderResult.rows[0].order_id;
        let totalPrice = 0;

        if (customerId) {
            await client.query(
                `UPDATE users
                SET orders_placed = orders_placed + 1
                WHERE id = $1`,
                [customerId]
            );
        }

        for (const item of items) {
            const { productId, quantity } = item;

            const productResult = await client.query(
                `SELECT product_price FROM products WHERE product_id = $1`,
                [productId]
            );
            if (productResult.rows.length === 0) {
                throw new Error("Product not found.");
            }

            const realPrice = Number(productResult.rows[0].product_price);

            const stockUpdate = await client.query(
                `UPDATE products
                SET stock_quantity = stock_quantity - $1
                WHERE product_id = $2
                AND stock_quantity >= $1`,
                [quantity, productId]
            );

            if (stockUpdate.rowCount === 0) {
                throw new Error("Insufficient stock");
            }

            const subtotal = quantity * realPrice;
            totalPrice += subtotal;

            await client.query(
                `INSERT INTO order_items
                (order_id, product_id, quantity, unit_price, subtotal)
                VALUES ($1, $2, $3, $4, $5)`,
                [orderId, productId, quantity, realPrice, subtotal]
            );
        }

        await client.query(
            `UPDATE orders
            SET total_price = $1
            WHERE order_id = $2`,
            [totalPrice, orderId]
        );

        await client.query("COMMIT");

        const responseBody = {
            success: true,
            orderId,
            customerId: customerId || null,
            shippingAddress,
            paymentMethod,
            email,
            totalPrice,
            items,
            sendEmail: sendEmail ?? false
        };

        console.log("Order inserted: ", JSON.stringify(responseBody, null, 2));

        return NextResponse.json(responseBody);
    } catch (err) {
        await client.query("ROLLBACK");
        console.log(err);
        return NextResponse.json(
            { error: "Order failed to be placed" },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}