CREATE TABLE `don_hang` (
  `id_dh` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `thoi_diem_mua` datetime DEFAULT current_timestamp(),
  `ho_ten` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `don_hang_chi_tiet` (
  `id_ct` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_dh` int(11) NOT NULL COMMENT 'Mã đơn hàng',
  `id_sp` int(11) NOT NULL COMMENT 'Mã sản phẩm',
  `so_luong` int(11)  DEFAULT 1 COMMENT 'Số lượng sản phẩm'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
