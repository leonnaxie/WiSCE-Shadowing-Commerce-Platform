const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1117",
    database: "ecommerce_db"
})

async function FetchUsers() {
    try {
        await client.connect();
        const res = await client.query("SELECT * FROM users");
        console.log(res.rows);
    } catch (err) {
        console.error(err.message);
    } finally {
        await client.end();
    }
}

FetchUsers();