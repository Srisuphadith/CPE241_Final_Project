INSERT INTO tbl_user_phones (user_ID, phone_number, is_primary) VALUES
(1, '0812345678', 1),
(1, '0898765432', 0),
(2, '0823456789', 1),
(3, '0834567890', 1),
(4, '0845678901', 1);

INSERT INTO tbl_address (user_ID, buildingNumber, sub_province, province, city, country, zip_code, txt) VALUES
(1, '123/45', 'Bang Kapi', 'Bangkok', 'Bangkok', 'Thailand', '10240', 'Near Mall'),
(2, '678/90', 'Lat Krabang', 'Bangkok', 'Bangkok', 'Thailand', '10520', NULL),
(3, '55/66', 'Sutthisan', 'Bangkok', 'Bangkok', 'Thailand', '10310', NULL),
(4, '77/88', 'Dindaeng', 'Bangkok', 'Bangkok', 'Thailand', '10400', 'Condo A'),
(5, '99/11', 'Chatuchak', 'Bangkok', 'Bangkok', 'Thailand', '10900', NULL);

INSERT INTO tbl_shops (shopName, user_ID) VALUES
('John Gadget Shop', 1),
('Jane Fashion', 2),
('Alice Art', 3),
('Bob Books', 4),
('Eve Electronics', 5);

INSERT INTO tbl_categories (cateName) VALUES
('Electronics'),
('Clothing'),
('Books'),
('Home Appliances'),
('Art Supplies');

INSERT INTO tbl_products (shop_ID, cate_ID, productName, imgPath, description, price, quantity) VALUES
(1, 1, 'Wireless Earbuds', '/img/earbuds.jpg', 'Bluetooth 5.0 earbuds', 1299.00, 50),
(2, 2, 'Summer Dress', '/img/dress.jpg', 'Lightweight summer dress', 799.00, 30),
(4, 3, 'Fiction Novel', '/img/novel.jpg', 'Best-selling novel', 450.00, 20),
(5, 1, 'Smartphone Case', '/img/case.jpg', 'Shockproof smartphone case', 299.00, 100),
(3, 5, 'Watercolor Set', '/img/watercolor.jpg', '24 color watercolor set', 599.00, 25);

INSERT INTO tbl_product_stats (product_ID, addToCart, visit, numSold) VALUES
(1, 25, 200, 15),
(2, 30, 150, 10),
(3, 15, 100, 5),
(4, 40, 250, 20),
(5, 10, 80, 3);

INSERT INTO tbl_carts (user_ID, product_ID, quantity) VALUES
(1, 2, 1),
(2, 1, 2),
(3, 3, 1),
(4, 5, 4),
(5, 4, 2);

INSERT INTO tbl_coupons (couponCode, discount, minOrderValue, expDate, remain) VALUES
('SAVE10', 10.00, 500.00, '2025-12-31', 100),
('FREESHIP', 5.00, 300.00, '2025-08-31', 50),
('WELCOME15', 15.00, 800.00, '2025-11-30', 200),
('BLACKFRIDAY', 20.00, 1500.00, '2025-11-29', 20),
('NEWYEAR5', 5.00, 200.00, '2026-01-01', 500);

INSERT INTO tbl_transactions (user_ID, sumPrice, coupon_ID, grandTotal, paid, transport_state) VALUES
(1, 2598.00, 1, 2338.20, 1, 'Shipped'),
(2, 799.00, 2, 759.05, 1, 'Processing'),
(3, 450.00, NULL, 450.00, 0, 'Pending'),
(4, 1196.00, 3, 1016.60, 1, 'Delivered'),
(5, 898.00, 1, 808.20, 1, 'Cancelled');

INSERT INTO tbl_transaction_items (trans_ID, product_ID, quantity, price) VALUES
(1, 1, 2, 1299.00),
(2, 2, 1, 799.00),
(3, 3, 1, 450.00),
(4, 5, 4, 299.00),
(5, 4, 2, 299.00);

INSERT INTO tbl_reviews (product_ID, user_ID, starRate, txt) VALUES
(1, 1, 5, 'Great sound quality!'),
(2, 2, 4, 'Nice dress, good fabric.'),
(3, 3, 5, 'Loved the story. Highly recommended.'),
(4, 5, 3, 'The case is okay, but packaging was bad.'),
(5, 4, 5, 'Very vibrant colors, good for artists.');