-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2023 at 08:55 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `peellakanda`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `Id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `address` varchar(500) NOT NULL,
  `telephone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`Id`, `name`, `fullName`, `city`, `address`, `telephone`) VALUES
(1, 'dilipa ', 'Ishan Sandaruwan', 'Gampaha', 'baththaramulla', 1234567890),
(5, 'Ishan Sandaruwan', 'Ishan Sandaruwan', 'Gampaha', 'Gampaha,baththaramulla', 761522239);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `name` varchar(200) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `quantity` int(3) NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id`, `name`, `description`, `price`, `category`) VALUES
(4, 'chicken kottu', 'chicken kottu', 1299.99, 'Kottu'),
(5, 'chicken noodles kottu', 'chicken noodles kottu', 1235.99, 'Kottu'),
(6, 'Egg kottu', 'Egg kottu', 1599.99, 'Kottu'),
(7, 'chicken fride rice', 'chicken fride rice', 299.99, 'rice'),
(8, 'Egg fried rice', 'Egg fried rice', 560.00, 'rice'),
(9, 'fish fried rice', 'fish fried rice', 650.00, 'rice'),
(10, 'chicken pork rice & curry', 'chicken pork rice & curry', 260.00, 'Rice & curry'),
(11, 'Fish rice & curry', 'Fish rice & curry', 750.00, 'Rice & curry'),
(12, 'vegetable egg rice & curry', 'vegetable egg rice & curry', 850.00, 'Rice & curry');

-- --------------------------------------------------------

--
-- Table structure for table `halldeta`
--

CREATE TABLE `halldeta` (
  `Id` char(1) NOT NULL,
  `des1` varchar(500) NOT NULL,
  `des2` varchar(200) NOT NULL,
  `location` varchar(300) NOT NULL,
  `area` varchar(300) NOT NULL,
  `img1` varchar(200) NOT NULL,
  `img2` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `halldeta`
--

INSERT INTO `halldeta` (`Id`, `des1`, `des2`, `location`, `area`, `img1`, `img2`) VALUES
('A', 'Our warmest wishes for another beautiful day in your life. It is our pleasure to brighten your beautiful day. We are ready to decorate the un-air-conditioned PEELLAKANDA RECEPTION HALL A for your event.\r\n', 'Celebrate love amid a blend of elegance and luxury', 'Coming to the reception hall, you will find reception HALL A when you proceed down the road on the left from the car park below.', 'This impressive ballroom is ideal for large weddings with a total of 2000 square feet of space.', '', ''),
('B', 'We would like to congratulate you on your wedding, Home coming or any precious occasion. We would deem it an honour to participate in this memorable event would be delighted to offer our facilities and services on this very special day. PEELLAKANDA RECEPTOIN HALL B provides a comfortable atomosphere for our guests with air conditioning and well arranged modern banqueting hall facilities.', 'We are dedicated to making your wedding journey as stress-free as possible', 'Coming to the reception hall, you will find reception HALL B when you proceed down the road on the right from the car park below.', 'This impressive ballroom is ideal for large weddings with a total of 3000 square feet of space.', '', ''),
('C', 'First of all our congratulations to you. We have prepared the most beautiful funtion hall PEELLAKANDA RECEPTION HALL C for your special day. We are rady to decorate this air-condition hall in any way to impress for your special occasions.', 'Celebrate in style and customize your celebration to suit your requirements', 'Coming to the reception hall, At the end of the road straight up is HALL C.', 'This impressive ballroom is ideal for large weddings with a total of 2000 square feet of space.', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `hallinquere`
--

CREATE TABLE `hallinquere` (
  `email` varchar(50) NOT NULL,
  `phone` int(10) NOT NULL,
  `title` varchar(10) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `message` varchar(500) NOT NULL,
  `banquetHall` char(1) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hallinquere`
--

INSERT INTO `hallinquere` (`email`, `phone`, `title`, `fullName`, `message`, `banquetHall`, `date`) VALUES
('0', 123456789, 'Mr', 'Ishan Sandaruwan', 'sdfdsf', 'A', '2023-08-23'),
('sadaruwan0427@gmail.com', 123456789, 'Mr', 'Ishan Sandaruwan', 'dfgg', 'A', '2023-08-19'),
('sadaruwan0427@gmail.com', 2147483647, 'Mrs', 'Ishan Sandaruwan', 'sdf', 'B', '2023-08-11'),
('sadaruwan0427@gmail.com', 2147483647, 'Mr', 'Ishan Sandaruwan', 'rdfgd', 'B', '2023-09-01'),
('sadaruwan0427@gmail.com', 2147483647, 'Mr', 'Ishan Sandaruwan', 'cv', 'A', '2023-08-16'),
('sadaruwan0427@gmail.com', 123456789, 'Mrs', 'Ishan Sandaruwan', 'fgh', 'C', '2023-08-11'),
('sadaruwan0427@gmail.com', 2147483647, 'Mrs', 'Ishan Sandaruwan', 'yi8', 'A', '2023-08-11'),
('sadaruwan0427@gmail.com', 123456789, 'Mr', 'Ishan Sandaruwan', 'd', 'B', '2023-09-14'),
('sadaruwan0427@gmail.com', 123456789, 'Mrs', 'Ishan Sandaruwan', 'ko', 'C', '2023-08-24'),
('sadaruwan0427@gmail.com', 123456789, 'Mr', 'Ishan Sandaruwan', 'Fuck', 'B', '2023-08-17'),
('pamodrathnayakegpx@gmail.com', 123456789, 'Mr', 'Pamod', 'hi', 'C', '2023-08-18');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `Id` int(11) NOT NULL,
  `filename` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`Id`, `filename`, `title`, `description`) VALUES
(3, 'image_1.jpg', 'image_1', 'hall A'),
(4, 'image_2.jpg', 'image_2', 'hall A'),
(5, 'image_3.jpg', 'image_3', 'hall A'),
(6, 'image_4.jpg', 'image_4', 'hall A'),
(7, 'image_5.jpg', 'image_5', 'hall A'),
(8, 'image_0.jpg', 'image_0', 'hall B'),
(9, 'image_1.jpg', 'image_1', 'hall B'),
(10, 'image_2.jpg', 'image_2', 'hall B'),
(11, 'image_3.jpg', 'image_3', 'hall B'),
(12, 'image_1.jpg', 'image_1', 'hall C'),
(13, 'image_2.jpg', 'image_2', 'hall C');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(10) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `foodlist` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Id`, `name`, `price`, `date`, `foodlist`) VALUES
(10, 'Ishan Sandaruwan', 1250, '2023-08-19', ''),
(11, 'Ishan Sandaruwan', 1250, '2023-08-19', ''),
(12, 'dilipa ', 5000, '2023-08-22', ''),
(13, 'dilipa ', 5000, '2023-08-22', ''),
(14, 'dilipa ', 12500, '2023-08-22', ''),
(15, 'dilipa ', 12500, '2023-08-22', ''),
(16, 'dilipa ', 5000, '2023-08-22', ''),
(17, 'dilipa ', 4250, '2023-08-23', ''),
(18, 'dilipa ', 5850, '2023-08-23', ''),
(19, 'dilipa ', 5850, '2023-08-23', ''),
(20, 'dilipa ', 5850, '2023-08-23', ''),
(21, 'dilipa ', 1236, '2023-08-23', ''),
(22, 'dilipa ', 2536, '2023-08-23', ''),
(23, 'dilipa ', 750, '2023-08-24', ''),
(24, 'dilipa ', 650, '2023-08-24', '');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`order_detail_id`, `order_id`, `username`, `product_name`, `quantity`) VALUES
(1, 15, '', 'kottu-1', 2),
(2, 15, '', 'rice-01', 2),
(3, 16, '', 'kottu-1', 2),
(4, 17, '', 'chicken kottu', 1),
(5, 17, '', 'rice-01', 2),
(6, 17, '', 'rice-2', 1),
(7, 18, '', 'chicken kottu', 1),
(8, 18, '', 'Egg kottu', 1),
(9, 18, '', 'rice-01', 2),
(10, 18, '', 'rice-2', 1),
(11, 19, '', 'chicken kottu', 1),
(12, 19, '', 'Egg kottu', 1),
(13, 19, '', 'rice-01', 2),
(14, 19, '', 'rice-2', 1),
(15, 20, '', 'chicken kottu', 1),
(16, 20, '', 'Egg kottu', 1),
(17, 20, '', 'rice-01', 2),
(18, 20, '', 'rice-2', 1),
(19, 21, 'chicken noodles kottu', '1', 0),
(20, 22, 'dilipa ', 'chicken kottu', 1),
(21, 22, 'dilipa ', 'chicken noodles kottu', 1),
(22, 23, 'dilipa ', 'Fish rice & curry', 1),
(23, 24, 'dilipa ', 'fish fried rice', 1);

-- --------------------------------------------------------

--
-- Table structure for table `res_user_rating`
--

CREATE TABLE `res_user_rating` (
  `id` int(11) NOT NULL,
  `p_name` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rate` int(2) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `res_user_rating`
--

INSERT INTO `res_user_rating` (`id`, `p_name`, `name`, `rate`, `comment`, `date`, `category`) VALUES
(1, 'chicken kottu', 'dilipa', 3, 'very good ', '2023-08-23', 'Kottu'),
(2, 'Egg kottu', 'dilipa', 4, 'Yummy', '2023-08-23', 'Kottu'),
(3, 'chicken noodles kottu', 'dilipa ', 1, 'fair', '2023-08-23', ''),
(5, 'Fish rice & curry', 'dilipa ', 3, 'suppa', '2023-08-24', '');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `name` varchar(20) NOT NULL,
  `p1` varchar(500) NOT NULL,
  `p2` varchar(500) NOT NULL,
  `p3` varchar(500) NOT NULL,
  `tit` varchar(50) NOT NULL,
  `titdec` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `mobile` bigint(10) NOT NULL,
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `name`, `email`, `password`, `mobile`, `points`) VALUES
(1, 'Ishan Sandaruwan', 'sadaruwan0427@gmail.com', 'esrtysertyst', 1212121212, 150),
(2, 'user1', 'user1@gmail.com', 'password1', 123456789, 0),
(3, 'user2', 'user2@gmail.com', 'password', 714567892, 0),
(4, 'dilipa ', 'dilipa@gmail.com', '123456789', 123456789, 1535),
(5, 'user24', 'user24@gmail.com', 'user24@gmail.com', 761522239, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userswantdata`
--

CREATE TABLE `userswantdata` (
  `Id` int(11) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `phone` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `subject` varchar(300) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `title` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userswantdata`
--

INSERT INTO `userswantdata` (`Id`, `fname`, `lname`, `phone`, `email`, `city`, `subject`, `message`, `title`) VALUES
(1, 'Ishan', 'Sandaruwan', 2147483647, 'sadaruwan0427@gmail.com', 'Gampaha', 'qwer', 'asdf', 'Mrs'),
(2, 'saman', 'kumara', 123456789, 'sadaruwan0427@gmail.com', 'Gampaha', 'qwer', 'asdfzxcv', 'Miss'),
(3, 'saman ', 'edirimuni', 2147483647, 'sadaruwan0427@gmail.com', 'Gampaha', 'sdfg', 'asdfasdf', 'Mrs'),
(4, 'Ishan', 'Sandaruwan', 2147483647, 'roshini0113@gmail.com', 'Gampaha', 'dfgd', 'dfgdf', 'Mr'),
(5, 'Ishan', 'Sandaruwan', 2147483647, 'roshinilalithya21@gmail.com', 'Gampaha', 'ad', 'asdasd', 'Mrs');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`name`,`product_name`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `halldeta`
--
ALTER TABLE `halldeta`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `fk_order_id` (`order_id`);

--
-- Indexes for table `res_user_rating`
--
ALTER TABLE `res_user_rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `userswantdata`
--
ALTER TABLE `userswantdata`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `res_user_rating`
--
ALTER TABLE `res_user_rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userswantdata`
--
ALTER TABLE `userswantdata`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
