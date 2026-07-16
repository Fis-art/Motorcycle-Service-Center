-- Megabuana Motor - Seed Data
-- Run AFTER schema.sql

USE `megabuana_motor`;

-- -----------------------------------------------------------
-- Hero Slides
-- -----------------------------------------------------------
INSERT INTO `hero_slides` (`title`, `subtitle`, `image`, `cta_text`, `cta_link`, `active`, `sort_order`) VALUES
('Selamat Datang di Megabuana Motor', 'Bengkel motor profesional terpercaya di Indonesia – ahlinya servis dan perawatan motor Anda', '/images/hero/banner-1.jpg', 'Lihat Layanan', '/services', TRUE, 1),
('Servis Berkala & Tune Up', 'Jaga performa motor tetap prima dengan layanan tune up dan servis berkala dari mekanik kami', '/images/hero/banner-2.jpg', 'Booking Sekarang', '/contact', TRUE, 2),
('Ganti Oli & Ban Original', 'Produk original dengan harga terbaik – oli, ban, dan spare part motor berkualitas tinggi', '/images/hero/banner-3.jpg', 'Hubungi Kami', '/contact', TRUE, 3);

-- -----------------------------------------------------------
-- About Sections
-- -----------------------------------------------------------
INSERT INTO `about_sections` (`title`, `subtitle`, `description`, `image`, `vision`, `mission`, `active`) VALUES
('Tentang Megabuana Motor',
 'Mitra terbaik untuk perawatan motor kesayangan Anda',
 'Megabuana Motor adalah bengkel spesialis perawatan dan perbaikan motor yang telah berpengalaman melayani pelanggan di Indonesia. Kami berkomitmen memberikan layanan berkualitas tinggi dengan harga yang kompetitif. Didukung oleh mekanik profesional dan peralatan modern, setiap motor yang datang ke bengkel kami mendapatkan penanganan terbaik.\n\nKami memahami bahwa motor adalah kebutuhan utama bagi mobilitas sehari-hari. Oleh karena itu, kami selalu mengutamakan kecepatan, ketepatan, dan kepuasan pelanggan dalam setiap layanan yang kami berikan.',
 '/images/about/about-us.jpg',
 'Menjadi bengkel motor terdepan di Indonesia yang dikenal akan kualitas layanan, integritas, dan kepuasan pelanggan.',
 '1. Memberikan layanan perawatan dan perbaikan motor dengan standar kualitas tertinggi\n2. Mengutamakan kepuasan pelanggan melalui pelayanan yang ramah, cepat, dan profesional\n3. Menggunakan spare part dan produk original yang terjamin kualitasnya\n4. Terus mengembangkan kompetensi mekanik melalui pelatihan dan sertifikasi berkala\n5. Menjaga harga yang kompetitif tanpa mengorbankan kualitas',
 TRUE);

-- -----------------------------------------------------------
-- Services
-- -----------------------------------------------------------
INSERT INTO `services` (`title`, `description`, `icon`, `image`, `features`, `sort_order`, `active`) VALUES
('Servis Ringan',
 'Perawatan rutin untuk menjaga performa motor tetap optimal. Cocok dilakukan setiap 1.000 – 2.000 km.',
 'fa-oil-can',
 '/images/services/servis-ringan.jpg',
 '["Ganti oli mesin", "Pembersihan filter udara", "Pengecekan rantai & gir", "Pengecekan kelistrikan", "Setel kopling & rem", "Lumasi komponen"]',
 1, TRUE),

('Servis Berat',
 'Perawatan menyeluruh untuk motor dengan pemakaian di atas 10.000 km. Meliputi pembongkaran dan pemeriksaan komponen utama.',
 'fa-tools',
 '/images/services/servis-berat.jpg',
 '["Overhoul mesin lengkap", "Pembongkaran karburator/Injeksi", "Pemeriksaan kruk-as & piston", "Ganti seal & gasket", "Pembersihan tangki bensin", "Kalibrasi kelistrikan"]',
 2, TRUE),

('Tune Up Motor Injeksi',
 'Optimasi performa motor injeksi menggunakan alat scan diagnostik modern untuk hasil yang presisi.',
 'fa-microchip',
 '/images/services/tune-up-injeksi.jpg',
 '["Scan ECU diagnostic", "Pembersihan throttle body", "Kalibrasi idle & CO", "Pengecekan sensor", "Reset adaptif learning", "Test ride & fine tuning"]',
 3, TRUE),

('Ganti Oli & Filter',
 'Ganti oli mesin dengan merek terpercaya seperti AHM, Yamalube, Castrol, Motul, dan IPONE.',
 'fa-droplet',
 '/images/services/ganti-oli.jpg',
 '["Oli mesin berbagai merek", "Oli gardan (matik)", "Filter oli original", "Pembersihan magnet karter", "Pengecekan volume oli akhir"]',
 4, TRUE),

('Ganti Ban & Balancing',
  'Ban original untuk berbagai tipe motor – tersedia tubeless dan tube type dari merek terkemuka.',
  'fa-circle',
  '/images/services/ganti-ban.jpg',
  '["Ban tubeless & tube type", "Balancing roda presisi", "Pentil & bobok ban", "Angin nitrogen gratis", "Ban dalam berbagai ukuran", "Diskon khusus pembelian 2 ban"]',
  5, TRUE),

('Ganti Spare Part',
 'Penyediaan dan pemasangan spare part original untuk semua tipe motor. Konsultasi gratis.',
 'fa-cogs',
 '/images/services/spare-part.jpg',
 '["Kampas rem depan & belakang", "Rantai & gir set", "Busir & koil", "Aki basah & kering", "V-belt & roller matik", "Lampu, spion, & aksesoris"]',
 7, TRUE),

('Diagnosa & Perbaikan Elektrik',
  'Penanganan masalah kelistrikan motor mulai dari pengisian aki, spul, hingga sistem injeksi.',
  'fa-bolt',
  '/images/services/diagnosa-elektrik.jpg',
  '["Pemeriksaan sistem pengisian", "Service dynamo & spul", "Perbaikan wiring harness", "Ganti CDI/ECU", "Pemasangan aksesoris kelistrikan", "Racing harness"]',
  8, TRUE);

-- -----------------------------------------------------------
-- Products (Sparepart, Aksesoris, Oli, Aki, Ban, Paket Servis)
-- -----------------------------------------------------------
INSERT INTO `products` (`name`, `category`, `brand`, `description`, `image`, `price`, `old_price`, `promo`, `stock`, `motor_type`, `sort_order`, `active`) VALUES
('Oli Mesin Yamalube Super 1L', 'oli', 'Yamalube', 'Oli mesin 4-tak semi sintetik untuk motor harian. Melindungi mesin dari gesekan dan panas berlebih.', '/images/products/oli-yamalube.jpg', 45000, 60000, TRUE, 120, 'Matic', 1, TRUE),
('Oli Mesin AHM MPX 0.8L', 'oli', 'AHM', 'Oli mesin original Honda, menjaga performa mesin tetap halus dan awet.', '/images/products/oli-ahm.jpg', 38000, 50000, TRUE, 95, 'Matic', 2, TRUE),
('Ban Tubeless IRC Fastron 90/90-14', 'ban', 'IRC', 'Ban depan tubeless untuk motor matic. Grip optimal di jalan basah dan kering.', '/images/products/ban-irc.jpg', 135000, 165000, TRUE, 40, 'Matic', 3, TRUE),
('Ban Belakang FDR Sport-X 100/90-14', 'ban', 'FDR', 'Ban belakang dengan kompon lembut untuk traksi dan kecepatan stabil di jalan raya.', '/images/products/ban-fdr.jpg', 155000, 185000, TRUE, 38, 'Matic', 4, TRUE),
('Aki Kering GS Astra 12V 5Ah', 'aki', 'GS Astra', 'Aki kering bebas perawatan, arus stabil untuk sistem injeksi motor matic.', '/images/products/aki-gs.jpg', 185000, 220000, TRUE, 25, 'Matic', 5, TRUE),
('Kampas Rem Depan Original', 'sparepart', 'OEM', 'Kampas rem depan original, tahan panas dan tidak berisik. Cocok semua tipe matic.', '/images/products/kampas-rem.jpg', 65000, 85000, TRUE, 60, 'Matic', 6, TRUE),
('Rantai & Gir Set 428H', 'sparepart', 'SSS', 'Set rantai dan gir 428H kuat dan awet untuk motor bebek dan sport.', '/images/products/rantai-gir.jpg', 230000, 280000, TRUE, 30, 'Bebek', 7, TRUE),
('Busi Iridium NGK CPR8EAIX', 'sparepart', 'NGK', 'Busi iridium untuk pembakaran lebih sempurna, akselerasi lebih responsif.', '/images/products/busi-ngk.jpg', 55000, 70000, TRUE, 80, 'Sport', 8, TRUE),
('Helm Full Face NHK NK-3', 'aksesoris', 'NHK', 'Helm full face SNI dengan visor anti-fog dan bawaan inner shield. Aman & stylish.', '/images/products/helm-nhk.jpg', 299000, 359000, TRUE, 20, 'All', 9, TRUE),
('Jaket Riding Textile waterproof', 'aksesoris', 'Respiro', 'Jaket riding waterproof dengan pelindung siku dan bahu yang nyaman dipakai harian.', '/images/products/jaket-riding.jpg', 245000, 299000, TRUE, 18, 'All', 10, TRUE),
('Knalpot Racing R9 Slip-On', 'aksesoris', 'R9', 'Knalpot slip-on racing dengan suara merdu dan bobot ringan untuk motor sport.', '/images/products/knalpot-r9.jpg', 425000, 520000, TRUE, 12, 'Sport', 11, TRUE),
('Paket Servis Berkala 1000km', 'servis', 'Megabuana', 'Paket servis ringan: ganti oli, cek rem, setel rantai, & cek kelistrikan gratis.', '/images/products/paket-servis.jpg', 150000, 200000, TRUE, 999, 'Matic', 12, TRUE),
('Paket Tune Up Injeksi', 'servis', 'Megabuana', 'Scan ECU + throttle body clean + kalibrasi CO. Performa kembali seperti baru.', '/images/products/tuneup-injeksi.jpg', 275000, 350000, TRUE, 999, 'Matic', 13, TRUE),
('V-Belt & Roller Matik Set', 'sparepart', 'OEM', 'Set V-belt dan roller untuk transmisi matic halus tanpa getaran.', '/images/products/vbelt-roller.jpg', 175000, 210000, TRUE, 45, 'Matic', 14, TRUE);

-- -----------------------------------------------------------
-- Galleries
-- -----------------------------------------------------------
INSERT INTO `galleries` (`title`, `description`, `image`, `category`, `active`) VALUES
('Area Servis Utama', 'Ruang servis dengan peralatan modern dan nyaman', '/images/galleries/area-servis-1.jpg', 'Workshop', TRUE),
('Alat Diagnostik Injeksi', 'Scanner injeksi untuk motor terkini', '/images/galleries/alat-diagnostik.jpg', 'Workshop', TRUE),
('Mekanik Sedang Bekerja', 'Tim mekanik profesional kami', '/images/galleries/mekanik-1.jpg', 'Team', TRUE),
('Produk Oli Lengkap', 'Rak oli berbagai merek tersedia', '/images/galleries/produk-oli.jpg', 'Produk', TRUE),
('Ban Original Tersedia', 'Koleksi ban untuk berbagai tipe motor', '/images/galleries/ban-original.jpg', 'Produk', TRUE),
('Ruang Tunggu Nyaman', 'Area tunggu pelanggan dengan AC dan WiFi', '/images/galleries/ruang-tunggu.jpg', 'Workshop', TRUE),
('Tim Mekanik Megabuana', 'Seluruh tim mekanik megabuana motor', '/images/galleries/tim-mekanik.jpg', 'Team', TRUE),
('Proses Balancing Ban', 'Proses balancing ban presisi tinggi', '/images/galleries/balancing-ban.jpg', 'Workshop', TRUE),
('Servis Motor Matic', 'Penanganan khusus motor matic', '/images/galleries/servis-matic.jpg', 'Workshop', TRUE);

-- -----------------------------------------------------------
-- Testimonials
-- -----------------------------------------------------------
INSERT INTO `testimonials` (`client_name`, `client_role`, `content`, `avatar`, `rating`, `active`) VALUES
('Bambang Supriyadi', 'Pengusaha, Jakarta', 'Pelayanan sangat memuaskan! Motor saya jadi lebih bertenaga setelah tune up di Megabuana Motor. Mekaniknya ramah dan profesional. Harga juga terjangkau. Recommended banget!', '/images/testimonials/client-1.jpg', 5, TRUE),
('Siti Rahmawati', 'Guru, Depok', 'Pertama kali servis di sini, pelayanannya ramah banget. Motor matic saya yang semula agak brebet sekarang jadi halus kembali. Terima kasih Megabuana Motor!', '/images/testimonials/client-2.jpg', 5, TRUE),
('Hendra Wijaya', 'Karyawan Swasta, Tangerang', 'Sudah langganan 3 tahun terakhir. Servis rutin selalu di sini. Hasilnya konsisten bagus, mekaniknya jujur soal spare part yang perlu diganti. Tidak pernah menyarankan yang tidak perlu.', '/images/testimonials/client-3.jpg', 5, TRUE),
('Dewi Lestari', 'Ibu Rumah Tangga, Bekasi', 'Anak saya motornya mogok di jalan, langsung hubungi Megabuana Motor. Teknisi cepat datang dan langsung bisa memperbaiki di tempat. Terima kasih banyak atas bantuannya!', '/images/testimonials/client-4.jpg', 4, TRUE),
('Ahmad Fauzi', 'Driver Ojek Online, Jakarta', 'Buat rekan-rekan driver, tempat servis ini recommended! Cepat, harganya bersahabat, dan hasilnya tahan lama. Selain itu ada diskon khusus servis untuk driver ojek online.', '/images/testimonials/client-5.jpg', 5, TRUE),
('Rina Marlina', 'Mahasiswi, Jakarta', 'Kali pertama ganti ban di sini, dijelasin lengkap beda merek dan tipe ban. Tidak merasa dipush beli yang mahal. Pelayanan ramah, tempatnya bersih. Next pasti balik lagi!', '/images/testimonials/client-6.jpg', 5, TRUE);

-- -----------------------------------------------------------
-- Contact Info
-- -----------------------------------------------------------
INSERT INTO `contact_info` (`type`, `label`, `value`, `icon`, `sort_order`) VALUES
('phone', 'Telepon', '021-12345678', 'fa-phone', 1),
('phone', 'WhatsApp', '0812-3456-7890', 'fa-whatsapp', 2),
('email', 'Email', 'info@megabuanamotor.com', 'fa-envelope', 3),
('address', 'Alamat Utama', 'Jl. Merdeka No. 123, Kelapa Gading, Jakarta Utara 14250', 'fa-map-marker-alt', 4),
('address', 'Cabang Depok', 'Jl. Margonda Raya No. 45, Depok, Jawa Barat 16431', 'fa-map-marker-alt', 5);

-- -----------------------------------------------------------
-- Contact Messages (sample submissions)
-- -----------------------------------------------------------
INSERT INTO `contact_messages` (`name`, `email`, `phone`, `subject`, `message`, `is_read`) VALUES
('Ahmad Fauzi', 'ahmad.fauzi@email.com', '081298765432', 'Info Servis Overhoul', 'Selamat siang, saya mau tanya untuk servis overhoul motor Supra X 125cc kira-kira berapa biayanya? Dan berapa lama pengerjaannya? Terima kasih.', TRUE),
('Dian Pratiwi', 'dian.pratiwi@email.com', '087812345678', 'Booking Servis', 'Halo, saya ingin booking servis tune up untuk motor Vario 150 saya. Apakah ada jadwal kosong untuk hari Sabtu ini? Mohon infonya ya.', TRUE),
('Rudi Hartono', 'rudi.h@email.com', '085611223344', 'Tanya Spare Part', 'Selamat sore, apakah menyediakan kampas rem depan untuk motor NMax 2022? Jika ada, berapa harganya? Terima kasih.', FALSE);

-- -----------------------------------------------------------
-- Business Hours
-- -----------------------------------------------------------
INSERT INTO `business_hours` (`day`, `open_time`, `close_time`, `is_closed`, `sort_order`) VALUES
('Senin',    '08:00', '17:00', FALSE, 1),
('Selasa',   '08:00', '17:00', FALSE, 2),
('Rabu',     '08:00', '17:00', FALSE, 3),
('Kamis',    '08:00', '17:00', FALSE, 4),
('Jumat',    '08:00', '16:30', FALSE, 5),
('Sabtu',    '08:00', '15:00', FALSE, 6),
('Minggu',   NULL,    NULL,    TRUE,  7);

-- -----------------------------------------------------------
-- Social Media
-- -----------------------------------------------------------
INSERT INTO `social_media` (`platform`, `url`, `icon`, `active`, `sort_order`) VALUES
('Facebook',  'https://facebook.com/megabuanamotor',   'fa-facebook-f',  TRUE, 1),
('Instagram', 'https://instagram.com/megabuanamotor',  'fa-instagram',   TRUE, 2),
('YouTube',   'https://youtube.com/@megabuanamotor',   'fa-youtube',     TRUE, 3),
('TikTok',    'https://tiktok.com/@megabuanamotor',    'fa-tiktok',      TRUE, 4);

-- -----------------------------------------------------------
-- Website Settings
-- -----------------------------------------------------------
INSERT INTO `website_settings` (`setting_key`, `setting_value`) VALUES
('site_name', 'Megabuana Motor'),
('site_description', 'Bengkel motor profesional terpercaya – ahlinya servis dan perawatan motor Anda di Indonesia'),
('site_logo', '/images/logo.png'),
('site_favicon', '/favicon.ico'),
('footer_text', '© 2024 Megabuana Motor. All rights reserved.'),
('google_maps_api_key', ''),
('google_analytics_id', ''),
('meta_keywords', 'bengkel motor, servis motor, tune up motor, ganti oli, ganti ban, bengkel motor jakarta'),
('whatsapp_number', '6281234567890'),
('whatsapp_message', 'Halo Megabuana Motor, saya ingin bertanya...');
