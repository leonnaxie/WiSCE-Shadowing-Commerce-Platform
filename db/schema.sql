CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
);

SELECT * FROM products;
SELECT * FROM products;

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

SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM order_items;

ALTER TABLE orders
ADD COLUMN send_email
BOOLEAN DEFAULT FALSE;

UPDATE products
SET stock_quantity = 99;


SELECT * FROM orders;

SELECT order_id 
FROM order_items;

INSERT INTO users (id, email, password_hash) VALUES (DEFAULT, 'jackharris@gmail.com', 'abefj123');

SELECT * FROM users;

ALTER TABLE users ADD COLUMN username VARCHAR(255);
SELECT * FROM users;


TRUNCATE TABLE order_items, orders, users RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY;

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

SELECT * FROM users;
SELECT * FROM orders;
SELECT * FROM products;
SELECT * FROM order_items;
SELECT * FROM sessions;

ALTER TABLE products
ADD COLUMN image_url TEXT;

SELECT * FROM products;

INSERT INTO products
(product_name, product_price, product_description, stock_quantity, image_url)
VALUES
(
    'White Bag',
    20,
    'A simplistic white bag for everyday use.',
    99,
    '/product_images/white_bag.png'
),
(
    'Brown Bag',
    35,
    'A stylish brown bag that works as a statement piece.',
    99,
    '/product_images/brown_bag.png'
),
(
    'Pink Bag',
    20,
    'A small but useful pink bag.',
    99,
    '/product_images/pink_bag.png'
),
(
    'Heart Buckle Bag',
    25,
    'Adorned by accessories, this buckle bag is great to carry around.',
    99,
    '/product_images/hearts_bag.png'
),
(
    'Cherry Tote Bag',
    15,
    'A plain tote bag with cherry decorations.',
    99,
    '/product_images/cherry_totebag.png'
),
(
    'Tote Bag',
    10,
    'The most simplistic tote bag.',
    99,
    '/product_images/tote_bag_icon.png'
),
(
    'Angel Bag',
    25,
    'A cute bag that has angel wings and storage.',
    99,
    '/product_images/angel_bag.png'
),
(
    'Glossy Black Bag',
    35,
    'Ever wanted to appear fashionable? A sharp black bag is the way to go.',
    99,
    '/product_images/silver_black_bag.png'
),
(
    'Musical Note Bag',
    20,
    'A soft, satin-y gray bag with a musical note pattern.',
    99,
    '/product_images/musical_grey_bag.png'
),
(
    'Colorful Bag',
    25,
    'A short but colorfully warm handbag.',
    99,
    '/product_images/striped_bag.png'
),
(
    'White Ita Bag',
    30,
    'Wraps across your body and can host moderately sized pins.',
    99,
    '/product_images/cream_itabag.png'
),
(
    'Nature Tote Bag',
    15,
    'Knitted with circular, sunflower patterns.',
    99,
    '/product_images/knitted_totebag.png'
),
(
    'Pearly Bag',
    45,
    'With a translucent white bow on front, the pearls make up the handles.',
    99,
    '/product_images/black_pearl_bag.png'
),
(
    'Blocky Pink Bag',
    15,
    'Sometimes you need something a little more compact that you can swing.',
    99,
    '/product_images/blocky_handbag.png'
),
(
    'Y2K Bag',
    25,
    'Traveling back into the past with big buckles and brown color schemes.',
    99,
    '/product_images/y2k_bag.png'
),
(
    'Fuzzy Pouches Bag',
    50,
    'Has various storage compartments for all the little things.',
    99,
    '/product_images/pouches_bag.png'
),
(
    'Patterned Bag',
    20,
    'A bag that you can bring out anytime you would like.',
    99,
    '/product_images/large_bag.png'
),
(
    'Asymmetrical Bag',
    25,
    'A unique but asymmetrical pink bag.',
    99,
    '/product_images/asymmetrical_bag.png'
),
(
    'Star Handbag',
    15,
    'Has a neutral color palette and a silver star.',
    99,
    '/product_images/white_star_bag.png'
),
(
    'Clear DIY Ita Bag',
    10,
    'Create your own customized ita bag with a completely plain bag.',
    99,
    '/product_images/mesh_itabag.png'
);



INSERT INTO products
(product_name, product_price, product_description, stock_quantity, image_url)
VALUES
(
    'Blue Ribbon Bag',
    25,
    'Laced with blue ribbons, and a miniature bow.',
    99,
    '/product_images/blue_ribbon_bag.png'
),
(
    'Scrunched Bag',
    15,
    'A scrunched up pink bag.',
    99,
    '/product_images/pink_stretch_bag.png'
),
(
    'Metallic Bag',
    20,
    'A shiny gray bag that is sleek and light.',
    99,
    '/product_images/metallic_bag.png'
),
(
    'Pure Pink Bag',
    10,
    'A miniature but compact bag to carry around every day.',
    99,
    '/product_images/pure_bag.png'
),
(
    'Decorated Black Bag',
    25,
    'A strapped black bag with silver and teal accessories.',
    99,
    '/product_images/decorated_black_bag.png'
),
(
    'Old Purse',
    35,
    'A delicate and handmade bag with a crocheted front.',
    99,
    '/product_images/purse_bag.png'
),
(
    'Polkadot Tote Bag',
    25,
    'A cotton tote bag with a blue polkadot pattern all around.',
    99,
    '/product_images/polkadot_totebag.png'
),
(
    'Green Tote Bag',
    25,
    'A wider green totebag with a motivating quote printed on the side.',
    99,
    '/product_images/green_bag.png'
),
(
    'Red Leather Bag',
    45,
    'A compact, small red leather bag with ribbon attachments.',
    99,
    '/product_images/red_bag.png'
),
(
    'Roll Bag',
    40,
    'A fluffy, long white bag that is shaped as a roll with a tiny charm.',
    99,
    '/product_images/fluffy_roll_bag.png'
)

ALTER TABLE orders
ALTER COLUMN customer_id DROP NOT NULL;
SELECT * FROM orders;

ALTER TABLE orders 
ADD COLUMN email TEXT NOT NULL;
SELECT * FROM orders;

UPDATE products
SET stock_quantity = 99
WHERE product_id = 2;
SELECT * FROM products;

UPDATE products
SET stock_quantity = 99
WHERE product_id = 4;

UPDATE products
SET stock_quantity = 99
WHERE product_id = 1;

UPDATE users
SET orders_placed = 0
WHERE id = 8;
SELECT * FROM users;


INSERT INTO products
(product_name, product_price, product_description, stock_quantity, image_url)
VALUES
(
    'Half-Colored Bag',
    30,
    'A bag that you can toss over your shoulders, with a portion of it being exceptionally fluffy.',
    99,
    '/product_images/half_bag.png'
),
(
    'Leather Brown Bag',
    25,
    'A classic that everyone should own, with a beaded accessory that comes for free.',
    99,
    '/product_images/leather_brown_bag.png'
),
(
    'Bleached Sky Bag',
    15,
    'A pale, bleached bag that has details of a grand city and a beaded bow.',
    99,
    '/product_images/bleached_bag.png'
),
(
    'Alternative Bag',
    25,
    'A chic hand-held bag that has a plaid background and an alternative but cute print on the front.',
    99,
    '/product_images/alt_print_bag.png'
),
(
    'Angelic Bag',
    10,
    'A soft, thin but durable bag that has ribbons streaming from both sides.',
    99,
    '/product_images/ribbons_bag.png'
),
(
    'Green Star Bag',
    30,
    'A camo-green leathery pouch that has a black pointed star in the front. It has many zippers.',
    99,
    '/product_images/green_star_bag.png'
),
(
    'Y2K Tote Bag',
    25,
    'A cotton bag that has a lot of storage space and can be sealed in the front.',
    99,
    '/product_images/y2k_tote_bag.png'
),
(
    'Patchwork Bag',
    45,
    'A curved purse that has four different patches of colors ranging from orange to green.',
    99,
    '/product_images/patchwork_bag.png'
),
(
    'Black Purse',
    45,
    'A tiny coin purse that has red and pink flowers embroidiered in the front.',
    99,
    '/product_images/black_purse.png'
),
(
    'Hello Kitty Backpack',
    20,
    'A kid-sized pink and velvet backpack that has the iconic childhood show mascot on the front.',
    99,
    '/product_images/hello_kitty_bacpack.png'
);


SELECT * FROM products;

UPDATE products
SET image_url = '/product_images/hello_kitty_backpack.png'
WHERE product_id = 40;