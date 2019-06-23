-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 21, 2019 at 12:20 AM
-- Server version: 8.0.15
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mymusicloader`
--
CREATE DATABASE IF NOT EXISTS `mymusicloader` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mymusicloader`;

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `ytId` varchar(120) NOT NULL,
  `status` text NOT NULL,
  `path` text NOT NULL,
  `format` varchar(20) NOT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `origin_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `downloaded` int(11) NOT NULL DEFAULT '0',
  `cryptlink` varchar(5000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

-- --------------------------------------------------------

-- Indexes for dumped tables
--

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ytId`,`format`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- Database: `video`
--
CREATE DATABASE IF NOT EXISTS `video` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `video`;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(13) NOT NULL,
  `ytId` varchar(255) NOT NULL,
  `songname` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `picture` varchar(2048) DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `type` varchar(25) NOT NULL DEFAULT 'yt',
  `watched` tinyint(4) NOT NULL DEFAULT '0',
  `fromUser` int(13) NOT NULL,
  `toUser` int(13) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `userid` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'uuid()'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `userid` int(12) NOT NULL,
  `name` varchar(500) NOT NULL,
  `videoId` varchar(255) NOT NULL,
  `playlistId` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `utoken` varchar(100) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `platformversion` varchar(11) NOT NULL,
  `platform` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `profilepicture` varchar(255) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lastlogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastDownload` timestamp NULL DEFAULT NULL,
  `sessions` int(11) NOT NULL DEFAULT '0',
  `appversion` varchar(2000) NOT NULL DEFAULT '1.0.1',
  `lastlong` varchar(40) DEFAULT NULL,
  `lastlat` varchar(40) DEFAULT NULL,
  `lastgistimestamp` timestamp NULL DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  `pushid` varchar(300) DEFAULT NULL,
  `pushtoken` varchar(300) DEFAULT NULL,
  `admob` tinyint(4) NOT NULL DEFAULT '0',
  `expires` bigint(11) NOT NULL DEFAULT '0',
  `payedtimes` int(11) NOT NULL DEFAULT '0',
  `lastreceipt` text,
  `amountSongs` int(11) NOT NULL DEFAULT '15',
  `downloaded` int(25) NOT NULL DEFAULT '0',
  `lastSongReceipt` text,
  `lastTimeSongReceipt` timestamp NULL DEFAULT NULL,
  `voucher1` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`userid`,`name`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playlistId` (`playlistId`),
  ADD KEY `videoId` (`videoId`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `utoken` (`utoken`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(13) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
