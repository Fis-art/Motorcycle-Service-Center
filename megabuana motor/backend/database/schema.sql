-- Database Schema
-- MySQL 8.0+ / MariaDB 10.3+
-- Engine: InnoDB | Charset: utf8mb4 | Collation: utf8mb4_unicode_ci
--
-- Import: mysql -u root -p < database/schema.sql

-- -----------------------------------------------------------
-- 1. users – Admin authentication
-- -----------------------------------------------------------
CREATE TABLE `users` (
  `id`         INT             NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100)    NOT NULL,
  `email`      VARCHAR(100)    NOT NULL,
  `password`   VARCHAR(255)    NOT NULL COMMENT 'bcrypt hash',
  `role`       ENUM('admin','superadmin') NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 2. hero_slides – Hero banner carousel
-- -----------------------------------------------------------
CREATE TABLE `hero_slides` (
  `id`         INT             NOT NULL AUTO_INCREMENT,
  `title`      VARCHAR(200)    NOT NULL,
  `subtitle`   VARCHAR(500)    DEFAULT NULL,
  `image`      VARCHAR(255)    NOT NULL,
  `cta_text`   VARCHAR(100)    DEFAULT NULL,
  `cta_link`   VARCHAR(255)    DEFAULT NULL,
  `active`     BOOLEAN         NOT NULL DEFAULT TRUE,
  `sort_order` INT             NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_hero_slides_active_sort` (`active`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 3. about_sections – About page content
-- -----------------------------------------------------------
CREATE TABLE `about_sections` (
  `id`         INT             NOT NULL AUTO_INCREMENT,
  `title`      VARCHAR(200)    NOT NULL,
  `subtitle`   VARCHAR(500)    DEFAULT NULL,
  `description` TEXT           NOT NULL,
  `image`      VARCHAR(255)    DEFAULT NULL,
  `vision`     TEXT            DEFAULT NULL,
  `mission`    TEXT            DEFAULT NULL,
  `active`     BOOLEAN         NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_about_sections_active` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 4. services – Workshop services (no prices)
-- -----------------------------------------------------------
CREATE TABLE `services` (
  `id`         INT             NOT NULL AUTO_INCREMENT,
  `title`      VARCHAR(200)    NOT NULL,
  `description` TEXT           NOT NULL,
  `icon`       VARCHAR(100)    DEFAULT NULL,
  `image`      VARCHAR(255)    DEFAULT NULL,
  `features`   JSON            DEFAULT NULL COMMENT 'Array of feature strings',
  `sort_order` INT             NOT NULL DEFAULT 0,
  `active`     BOOLEAN         NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_services_active_sort` (`active`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 5. galleries – Photo gallery
-- -----------------------------------------------------------
CREATE TABLE `galleries` (
  `id`          INT            NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(200)   DEFAULT NULL,
  `description` VARCHAR(500)   DEFAULT NULL,
  `image`       VARCHAR(255)   NOT NULL,
  `category`    VARCHAR(100)   DEFAULT NULL,
  `active`      BOOLEAN        NOT NULL DEFAULT TRUE,
  `created_at`  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_galleries_active_category` (`active`, `category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 6. testimonials – Customer reviews
-- -----------------------------------------------------------
CREATE TABLE `testimonials` (
  `id`          INT            NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(100)   NOT NULL,
  `client_role` VARCHAR(100)   DEFAULT NULL,
  `content`     TEXT           NOT NULL,
  `avatar`      VARCHAR(255)   DEFAULT NULL,
  `rating`      TINYINT        NOT NULL DEFAULT 5 COMMENT '1–5',
  `active`      BOOLEAN        NOT NULL DEFAULT TRUE,
  `created_at`  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_testimonials_active_rating` (`active`, `rating`),
  CONSTRAINT `chk_testimonials_rating` CHECK (`rating` BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 7. contact_info – Contact details (phone, email, address)
-- -----------------------------------------------------------
CREATE TABLE `contact_info` (
  `id`         INT             NOT NULL AUTO_INCREMENT,
  `type`       ENUM('phone','email','address') NOT NULL,
  `label`      VARCHAR(100)    DEFAULT NULL,
  `value`      VARCHAR(255)    NOT NULL,
  `icon`       VARCHAR(100)    DEFAULT NULL,
  `sort_order` INT             NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_contact_info_type_sort` (`type`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 8. contact_messages – Contact form submissions
-- -----------------------------------------------------------
CREATE TABLE `contact_messages` (
  `id`         INT             NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100)    NOT NULL,
  `email`      VARCHAR(100)    NOT NULL,
  `phone`      VARCHAR(50)     DEFAULT NULL,
  `subject`    VARCHAR(200)    DEFAULT NULL,
  `message`    TEXT            NOT NULL,
  `is_read`    BOOLEAN         NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_contact_messages_read_created` (`is_read`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 9. business_hours – Operating hours
-- -----------------------------------------------------------
CREATE TABLE `business_hours` (
  `id`         INT             NOT NULL AUTO_INCREMENT,
  `day`        VARCHAR(20)     NOT NULL COMMENT 'e.g. Monday, Tuesday',
  `open_time`  TIME            DEFAULT NULL,
  `close_time` TIME            DEFAULT NULL,
  `is_closed`  BOOLEAN         NOT NULL DEFAULT FALSE,
  `sort_order` INT             NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_business_hours_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 10. social_media – Social media links
-- -----------------------------------------------------------
CREATE TABLE `social_media` (
  `id`         INT             NOT NULL AUTO_INCREMENT,
  `platform`   VARCHAR(50)     NOT NULL,
  `url`        VARCHAR(255)    NOT NULL,
  `icon`       VARCHAR(100)    DEFAULT NULL,
  `active`     BOOLEAN         NOT NULL DEFAULT TRUE,
  `sort_order` INT             NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_social_media_active_sort` (`active`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 11. products – Sparepart, aksesoris & paket servis (with promo)
-- -----------------------------------------------------------
CREATE TABLE `products` (
  `id`           INT             NOT NULL AUTO_INCREMENT,
  `name`         VARCHAR(200)    NOT NULL,
  `category`     ENUM('sparepart','aksesoris','oli','aki','ban','servis') NOT NULL DEFAULT 'sparepart',
  `brand`        VARCHAR(100)    DEFAULT NULL,
  `description`  TEXT            DEFAULT NULL,
  `image`        VARCHAR(255)    DEFAULT NULL,
  `price`        DECIMAL(12,2)   NOT NULL DEFAULT 0,
  `old_price`    DECIMAL(12,2)   DEFAULT NULL COMMENT 'Harga coret untuk diskon',
  `promo`        BOOLEAN         NOT NULL DEFAULT FALSE COMMENT 'Tampil di halaman promo',
  `stock`        INT             NOT NULL DEFAULT 0,
  `motor_type`   VARCHAR(100)    DEFAULT NULL COMMENT 'e.g. Matic, Bebek, Sport',
  `active`       BOOLEAN         NOT NULL DEFAULT TRUE,
  `sort_order`   INT             NOT NULL DEFAULT 0,
  `created_at`   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_products_active_promo` (`active`, `promo`),
  KEY `idx_products_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 12. website_settings – Key-value configuration
-- -----------------------------------------------------------
CREATE TABLE `website_settings` (
  `id`            INT             NOT NULL AUTO_INCREMENT,
  `setting_key`   VARCHAR(100)    NOT NULL,
  `setting_value` TEXT            DEFAULT NULL,
  `created_at`    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_settings_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- 13. partnerships – Partner / brand logos
-- -----------------------------------------------------------
CREATE TABLE `partnerships` (
  `id`          INT            NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(200)   NOT NULL,
  `logo`       VARCHAR(255)   DEFAULT NULL,
  `url`        VARCHAR(255)   DEFAULT NULL,
  `active`     BOOLEAN        NOT NULL DEFAULT TRUE,
  `sort_order` INT            NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_partnerships_active_sort` (`active`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Default admin user
-- Password: admin123  (bcrypt hash)
-- -----------------------------------------------------------
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Admin Megabuana', 'admin@megabuanamotor.com', '$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQkf9Rn6bm1FZwOJK3v0pMl0Y1LvHu', 'superadmin');
