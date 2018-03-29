DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price  DECIMAL(10,2) NULL,
    stock_quantity INTEGER default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Calculator', 'Electronics', 99.99, 25), ('Iphone 6', 'Electronics', 149.99, 8), 
       ('GoPro Hero6', 'Electronics', 349.99, 5), ('Patagonia R3 Wetsuit', 'Surf', 489.99, 5),
       ('Future Fins', 'Surf', 105.00, 5), ('Tools of Titans', 'Books', 29.99, 3),
       ('30g Fish Tank', 'Pet Supplies', 199.99, 2), ('Cat Food', 'Pet Supplies', 19.99, 100),
       ('StarCraft II', 'Gaming', 59.99, 10), ('XBOX ONE', 'Gaming', 199.99, 10);

       SELECT * FROM products;