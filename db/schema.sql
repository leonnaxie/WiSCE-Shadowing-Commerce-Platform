CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
);

SELECT * FROM users;

CREATE table products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    product_price NUMERIC(10, 2),
    product_description TEXT,
    stock_quantity INTEGER
);

CREATE table orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES users(id),
    order_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50),
    total_price NUMERIC(10, 2),
    shipping_address TEXT,
    payment_method VARCHAR(50)
);

-- Handles the many-to-many relationship
-- between orders and products. Likely will
-- help the quantity go down, etc.
CREATE table order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INTEGER,
    unit_price NUMERIC(10, 2),
    subtotal NUMERIC(10, 2)
);

SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM order_items;

SELECT order_id 
FROM order_items;

INSERT INTO users (id, email, password_hash) VALUES (DEFAULT, 'jackharris@gmail.com', 'abefj123');

SELECT * FROM users;

ALTER TABLE users ADD COLUMN username VARCHAR(255);
SELECT * FROM users;


UPDATE users
SET username = 'jharris'
WHERE username IS NULL;

ALTER TABLE users ADD COLUMN address TEXT;
ALTER TABLE users ADD COLUMN orders_placed INTEGER;
SELECT * FROM users;


CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(128) UNIQUE NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

SELECT * FROM sessions;