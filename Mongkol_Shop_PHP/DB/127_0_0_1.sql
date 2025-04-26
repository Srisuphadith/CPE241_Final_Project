-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2025 at 02:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cpe241_shop`
--
CREATE DATABASE IF NOT EXISTS `cpe241_shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cpe241_shop`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_address`
--

CREATE TABLE `tbl_address` (
  `user_ID` int(11) NOT NULL,
  `buildingNumber` varchar(20) NOT NULL,
  `sub_province` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `txt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_carts`
--

CREATE TABLE `tbl_carts` (
  `user_ID` int(11) NOT NULL,
  `product_ID` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_carts`
--

INSERT INTO `tbl_carts` (`user_ID`, `product_ID`, `quantity`, `date_added`) VALUES
(1, 2, 1, '2025-04-13 17:00:00'),
(2, 1, 2, '2025-04-14 17:00:00'),
(3, 3, 1, '2025-04-12 17:00:00'),
(4, 4, 1, '2025-04-11 17:00:00'),
(5, 5, 3, '2025-04-10 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_categories`
--

CREATE TABLE `tbl_categories` (
  `cate_ID` int(11) NOT NULL,
  `cateName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_categories`
--

INSERT INTO `tbl_categories` (`cate_ID`, `cateName`) VALUES
(1, 'Electronics'),
(2, 'Skincare'),
(3, 'Books'),
(4, 'Clothing'),
(5, 'Groceries');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_coupons`
--

CREATE TABLE `tbl_coupons` (
  `coupon_ID` int(11) NOT NULL,
  `couponCode` varchar(50) DEFAULT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  `minOrderValue` decimal(10,2) DEFAULT NULL,
  `expDate` date DEFAULT NULL,
  `remain` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_coupons`
--

INSERT INTO `tbl_coupons` (`coupon_ID`, `couponCode`, `discount`, `minOrderValue`, `expDate`, `remain`) VALUES
(1, 'SAVE10', 10.00, 100.00, '2025-05-01', 5),
(2, 'FREESHIP', 20.00, 200.00, '2025-06-01', 2),
(3, 'WELCOME', 50.00, 300.00, '2025-06-30', 10),
(4, 'SUMMER25', 25.00, 250.00, '2025-07-15', 3),
(5, 'BLISS20', 20.00, 150.00, '2025-08-01', 7);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `product_ID` int(11) NOT NULL,
  `shop_ID` int(11) DEFAULT NULL,
  `cate_ID` int(11) DEFAULT NULL,
  `productName` varchar(100) DEFAULT NULL,
  `imgPath` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`product_ID`, `shop_ID`, `cate_ID`, `productName`, `imgPath`, `description`, `price`, `quantity`) VALUES
(1, 1, 1, 'Wireless Mouse', 'img/mouse.jpg', 'Ergonomic wireless mouse', 299.00, 50),
(2, 2, 2, 'Facial Cleanser', 'img/cleanser.jpg', 'Gentle facial cleanser', 199.00, 30),
(3, 3, 3, 'The Alchemist', 'img/book.jpg', 'A book by Paulo Coelho', 150.00, 40),
(4, 4, 1, 'Bluetooth Speaker', 'img/speaker.jpg', 'Portable speaker', 499.00, 20),
(5, 5, 5, 'Organic Rice', 'img/rice.jpg', '5kg Thai rice', 250.00, 60);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_stats`
--

CREATE TABLE `tbl_product_stats` (
  `product_ID` int(11) NOT NULL,
  `addToCart` int(11) DEFAULT NULL,
  `visit` int(11) DEFAULT NULL,
  `numSold` int(11) DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product_stats`
--

INSERT INTO `tbl_product_stats` (`product_ID`, `addToCart`, `visit`, `numSold`, `last_updated`) VALUES
(1, 100, 500, 40, '2025-04-14 17:00:00'),
(2, 60, 200, 20, '2025-04-13 17:00:00'),
(3, 120, 300, 70, '2025-04-12 17:00:00'),
(4, 90, 210, 50, '2025-04-11 17:00:00'),
(5, 75, 180, 60, '2025-04-10 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reviews`
--

CREATE TABLE `tbl_reviews` (
  `product_ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `starRate` int(11) DEFAULT NULL,
  `txt` text DEFAULT NULL,
  `date_posted` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_shops`
--

CREATE TABLE `tbl_shops` (
  `shop_ID` int(11) NOT NULL,
  `shopName` varchar(100) DEFAULT NULL,
  `user_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_shops`
--

INSERT INTO `tbl_shops` (`shop_ID`, `shopName`, `user_ID`) VALUES
(1, 'Gadget World', 4),
(2, 'Beauty Bliss', 2),
(3, 'Book Haven', 3),
(4, 'SmartTech', 1),
(5, 'Daily Essentials', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions`
--

CREATE TABLE `tbl_transactions` (
  `trans_ID` int(11) NOT NULL,
  `user_ID` int(11) DEFAULT NULL,
  `sumPrice` decimal(10,2) DEFAULT NULL,
  `coupon_ID` int(11) DEFAULT NULL,
  `grandTotal` decimal(10,2) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `transport_state` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transactions`
--

INSERT INTO `tbl_transactions` (`trans_ID`, `user_ID`, `sumPrice`, `coupon_ID`, `grandTotal`, `paid`, `date`, `transport_state`) VALUES
(1, 1, 598.00, 1, 588.00, 1, '2025-04-14 17:00:00', 'Shipped'),
(2, 2, 199.00, NULL, 199.00, 0, '2025-04-15 17:00:00', 'Pending'),
(3, 3, 450.00, 2, 430.00, 1, '2025-04-12 17:00:00', 'Delivered'),
(4, 4, 799.00, 3, 749.00, 1, '2025-04-11 17:00:00', 'Delivered'),
(5, 5, 250.00, NULL, 250.00, 0, '2025-04-10 17:00:00', 'Processing');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction_items`
--

CREATE TABLE `tbl_transaction_items` (
  `trans_ID` int(11) NOT NULL,
  `product_ID` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_transaction_items`
--

INSERT INTO `tbl_transaction_items` (`trans_ID`, `product_ID`, `quantity`, `price`) VALUES
(1, 1, 2, 299.00),
(2, 2, 1, 199.00),
(3, 3, 3, 150.00),
(4, 4, 1, 499.00),
(5, 5, 1, 250.00);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_ID` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `midName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `role` varchar(20) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_ID`, `firstName`, `midName`, `lastName`, `userName`, `password_hash`, `role`) VALUES
(1, 'John', 'A.', 'Doe', 'johndoe', 'hash123', 'user'),
(2, 'Jane', NULL, 'Smith', 'janesmith', 'hash456', 'user'),
(3, 'Mike', 'B.', 'Tyson', 'miketyson', 'hash789', 'user'),
(4, 'Emily', NULL, 'Watson', 'emwatson', 'hash101', 'user'),
(5, 'Admin', NULL, 'Root', 'adminuser', 'adminhash', 'user'),
(39, 'arno', 'p', 'poomi', 'arno0', '$2y$10$C408brHnxenVmOel/./2p.dvwNdNQ07c/Yp8TAsSK47VJfI4MgmOS', 'user'),
(40, 'nuttwawed', NULL, '', 'oooooooooo', '$2y$10$P6Ot0Zpl2nM6U1.hpxRJaeBLdwPXVFa2gvbUvt9cPGiEQDPUyfzxK', 'user'),
(42, 'A', NULL, 'N', 'user', '$2y$10$DvOdjUodFMt41WlfVfujhOAX1dN8j5tzsSlKrp0aTVUTwldyqiiGK', 'user'),
(43, 'df', NULL, 'df', 'abc', '$2y$10$zNgbqaSaT8zSCwkqaxyNP.TUED5RphaocGwWTWUKmUXSuEGmKC13e', 'user'),
(44, '7777777', NULL, '', '7777777777', '$2y$10$RpcHxLw8SjGMGTiftWVsVOSOiMHMQW473LQQh1iqmqQA2aaPZSTKu', 'admin'),
(45, 'Nuttawut', '', 'Sim', 'coconut', '$2y$10$1fPRySDAjAWRzsY3OxGNTudzBUck68NpDGpKZ1Lv5N7jNXdQ6sJr6', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_phones`
--

CREATE TABLE `tbl_user_phones` (
  `user_ID` int(11) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `is_primary` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user_phones`
--

INSERT INTO `tbl_user_phones` (`user_ID`, `phone_number`, `is_primary`) VALUES
(1, '0801234567', 1),
(1, '0809876543', 0),
(2, '0901231234', 1),
(3, '0899998888', 1),
(4, '0812345678', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_public`
-- (See below for the actual view)
--
CREATE TABLE `user_public` (
`user_ID` int(11)
,`firstName` varchar(50)
,`midName` varchar(50)
,`lastName` varchar(50)
,`userName` varchar(50)
,`role` varchar(20)
);

-- --------------------------------------------------------

--
-- Structure for view `user_public`
--
DROP TABLE IF EXISTS `user_public`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_public`  AS SELECT `tbl_users`.`user_ID` AS `user_ID`, `tbl_users`.`firstName` AS `firstName`, `tbl_users`.`midName` AS `midName`, `tbl_users`.`lastName` AS `lastName`, `tbl_users`.`userName` AS `userName`, `tbl_users`.`role` AS `role` FROM `tbl_users` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_address`
--
ALTER TABLE `tbl_address`
  ADD PRIMARY KEY (`user_ID`,`buildingNumber`);

--
-- Indexes for table `tbl_carts`
--
ALTER TABLE `tbl_carts`
  ADD PRIMARY KEY (`user_ID`,`product_ID`),
  ADD KEY `product_ID` (`product_ID`);

--
-- Indexes for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  ADD PRIMARY KEY (`cate_ID`);

--
-- Indexes for table `tbl_coupons`
--
ALTER TABLE `tbl_coupons`
  ADD PRIMARY KEY (`coupon_ID`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`product_ID`),
  ADD KEY `shop_ID` (`shop_ID`),
  ADD KEY `cate_ID` (`cate_ID`);

--
-- Indexes for table `tbl_product_stats`
--
ALTER TABLE `tbl_product_stats`
  ADD PRIMARY KEY (`product_ID`);

--
-- Indexes for table `tbl_reviews`
--
ALTER TABLE `tbl_reviews`
  ADD PRIMARY KEY (`product_ID`,`user_ID`),
  ADD KEY `user_ID` (`user_ID`);

--
-- Indexes for table `tbl_shops`
--
ALTER TABLE `tbl_shops`
  ADD PRIMARY KEY (`shop_ID`),
  ADD KEY `user_ID` (`user_ID`);

--
-- Indexes for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  ADD PRIMARY KEY (`trans_ID`),
  ADD KEY `user_ID` (`user_ID`),
  ADD KEY `coupon_ID` (`coupon_ID`);

--
-- Indexes for table `tbl_transaction_items`
--
ALTER TABLE `tbl_transaction_items`
  ADD PRIMARY KEY (`trans_ID`,`product_ID`),
  ADD KEY `product_ID` (`product_ID`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_ID`),
  ADD UNIQUE KEY `userName` (`userName`);

--
-- Indexes for table `tbl_user_phones`
--
ALTER TABLE `tbl_user_phones`
  ADD PRIMARY KEY (`user_ID`,`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_address`
--
ALTER TABLE `tbl_address`
  ADD CONSTRAINT `tbl_address_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `tbl_users` (`user_ID`);

--
-- Constraints for table `tbl_carts`
--
ALTER TABLE `tbl_carts`
  ADD CONSTRAINT `tbl_carts_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `tbl_users` (`user_ID`),
  ADD CONSTRAINT `tbl_carts_ibfk_2` FOREIGN KEY (`product_ID`) REFERENCES `tbl_products` (`product_ID`);

--
-- Constraints for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD CONSTRAINT `tbl_products_ibfk_1` FOREIGN KEY (`shop_ID`) REFERENCES `tbl_shops` (`shop_ID`),
  ADD CONSTRAINT `tbl_products_ibfk_2` FOREIGN KEY (`cate_ID`) REFERENCES `tbl_categories` (`cate_ID`);

--
-- Constraints for table `tbl_product_stats`
--
ALTER TABLE `tbl_product_stats`
  ADD CONSTRAINT `tbl_product_stats_ibfk_1` FOREIGN KEY (`product_ID`) REFERENCES `tbl_products` (`product_ID`);

--
-- Constraints for table `tbl_reviews`
--
ALTER TABLE `tbl_reviews`
  ADD CONSTRAINT `tbl_reviews_ibfk_1` FOREIGN KEY (`product_ID`) REFERENCES `tbl_products` (`product_ID`),
  ADD CONSTRAINT `tbl_reviews_ibfk_2` FOREIGN KEY (`user_ID`) REFERENCES `tbl_users` (`user_ID`);

--
-- Constraints for table `tbl_shops`
--
ALTER TABLE `tbl_shops`
  ADD CONSTRAINT `tbl_shops_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `tbl_users` (`user_ID`);

--
-- Constraints for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  ADD CONSTRAINT `tbl_transactions_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `tbl_users` (`user_ID`),
  ADD CONSTRAINT `tbl_transactions_ibfk_2` FOREIGN KEY (`coupon_ID`) REFERENCES `tbl_coupons` (`coupon_ID`);

--
-- Constraints for table `tbl_transaction_items`
--
ALTER TABLE `tbl_transaction_items`
  ADD CONSTRAINT `tbl_transaction_items_ibfk_1` FOREIGN KEY (`trans_ID`) REFERENCES `tbl_transactions` (`trans_ID`),
  ADD CONSTRAINT `tbl_transaction_items_ibfk_2` FOREIGN KEY (`product_ID`) REFERENCES `tbl_products` (`product_ID`);

--
-- Constraints for table `tbl_user_phones`
--
ALTER TABLE `tbl_user_phones`
  ADD CONSTRAINT `tbl_user_phones_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `tbl_users` (`user_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
