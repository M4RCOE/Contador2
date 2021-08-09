-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2021 a las 19:50:35
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_contador2`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarUser` (IN `username` VARCHAR(50), IN `nombre` VARCHAR(50), IN `apellidos` VARCHAR(100), IN `email` VARCHAR(100), IN `pass` VARCHAR(20), IN `nip` INT(4), IN `foto` VARCHAR(100), IN `id` INT)  NO SQL
BEGIN
UPDATE app_users SET app_users.USERNAME=username, app_users.NOMBRE=nombre, app_users.APELLIDOS=apellidos, app_users.EMAIL=email, app_users.PASSWORD=pass, app_users.NIP=nip, app_users.FOTO=foto WHERE app_users.IDUSER=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarUserSinFoto` (IN `username` VARCHAR(50), IN `nombre` VARCHAR(50), IN `apellidos` VARCHAR(100), IN `email` VARCHAR(100), IN `pass` VARCHAR(20), IN `nip` INT(4), IN `id` INT)  NO SQL
BEGIN
UPDATE app_users SET app_users.USERNAME=username, app_users.NOMBRE=nombre, app_users.APELLIDOS=apellidos, app_users.EMAIL=email, app_users.PASSWORD=pass, app_users.NIP=nip WHERE app_users.IDUSER=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrarDetallesMenu` (IN `id` INT)  NO SQL
BEGIN
	DELETE FROM app_menu_detalles WHERE app_menu_detalles.IDMENU = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `borrarUsuario` (IN `id` INT)  NO SQL
BEGIN
	DELETE FROM app_users WHERE app_users.IDUSER=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `detenerContadorUserServicio` (IN `fechafin` DATETIME, IN `tiempo` TIME, IN `estado` BINARY, IN `iduser` INT)  NO SQL
BEGIN
	UPDATE app_contador_users SET app_contador_users.FECHAFIN=fechafin,app_contador_users.TIEMPO=tiempo,app_contador_users.ESTADO=estado WHERE app_contador_users.IDUSER = iduser ORDER BY FECHA DESC, FECHAINICIO DESC LIMIT 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `iniciarContadorUserServicio` (IN `fechainicio` DATETIME, IN `fecha` DATE, IN `estado` BINARY, IN `iduser` INT)  NO SQL
BEGIN
	INSERT INTO app_contador_users(FECHAINICIO, FECHA, ESTADO, IDUSER) VALUES (fechainicio,fecha,estado,iduser);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarArchivo` (IN `nombre` VARCHAR(50), IN `extension` VARCHAR(10), IN `path` VARCHAR(50), IN `fecha` DATETIME)  NO SQL
BEGIN
	INSERT INTO app_archivos (NOMBRE, EXTENSION, PATH, FECHA) VALUES (nombre, extension,path,fecha);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarDetallesMenu` (IN `nombre` VARCHAR(50), IN `enlace` VARCHAR(50), IN `icono` VARCHAR(50), IN `nivel` INT, IN `id` INT)  NO SQL
BEGIN
	INSERT INTO app_menu_detalles (NOMBRE, ENLACE, ICONO, NIVEL, IDMENU) VALUES (nombre,enlace,icono,nivel,id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarMenu` (IN `nombre` VARCHAR(50), IN `fecha` DATETIME)  NO SQL
BEGIN
	INSERT INTO app_menu (NOMBRE, FECHA) VALUES (nombre, fecha);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarUser` (IN `nombre` VARCHAR(50), IN `apellidos` VARCHAR(100), IN `username` VARCHAR(50), IN `email` VARCHAR(100), IN `pass` VARCHAR(20), IN `nip` INT(4), IN `foto` VARCHAR(100), IN `tipo` INT)  NO SQL
BEGIN
	INSERT INTO app_users (USERNAME,NOMBRE,APELLIDOS,EMAIL,app_users.PASSWORD,NIP,FOTO,IDTIPO) VALUES (username,nombre,apellidos,email,pass,nip,foto,tipo);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertTareaUser` (IN `tarea` LONGTEXT, IN `fecha` DATE, IN `idestado` INT, IN `iduser` INT)  NO SQL
BEGIN
	INSERT INTO app_tareas (TAREA, FECHA, IDESTADO, IDUSER) VALUES (tarea, fecha, idestado, iduser);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modificarDetalleMenu` (IN `nombre` VARCHAR(50), IN `enlace` VARCHAR(50), IN `icono` VARCHAR(50), IN `id` INT)  NO SQL
BEGIN
	UPDATE app_menu_detalles SET app_menu_detalles.NOMBRE=nombre, app_menu_detalles.ENLACE=enlace, app_menu_detalles.ICONO=icono WHERE app_menu_detalles.IDDETALLE = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modificarTareaUser` (IN `idtarea` INT, IN `tarea` LONGTEXT, IN `fecha` DATE, IN `comentario` LONGTEXT, IN `idestado` INT)  NO SQL
BEGIN
	UPDATE app_tareas SET app_tareas.TAREA=tarea, app_tareas.FECHA=fecha, app_tareas.COMENTARIO=comentario, app_tareas.IDESTADO=idestado WHERE app_tareas.IDTAREA=idtarea;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerContadoresIniciados` ()  NO SQL
BEGIN
	SELECT * FROM app_contador_users WHERE ESTADO=1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerContadoresUser` (IN `id` INT)  NO SQL
BEGIN
	SELECT * FROM app_contador_users WHERE app_contador_users.IDUSER=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerDetallesMenu` (IN `id` INT)  NO SQL
BEGIN
	SELECT app_menu_detalles.* FROM app_menu_detalles JOIN app_menu ON app_menu_detalles.IDMENU=app_menu.IDMENU WHERE app_menu.IDMENU=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerDetallesMenuUsuario` (IN `id` INT)  NO SQL
BEGIN
	SELECT app_menu_detalles.* FROM app_menu JOIN app_menu_detalles ON app_menu.IDMENU=app_menu_detalles.IDMENU WHERE app_menu.IDUSER=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerMenus` ()  NO SQL
BEGIN 
	SELECT * FROM app_menu;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerMenuUsuario` (IN `id` INT)  NO SQL
BEGIN
	SELECT * FROM app_menu WHERE app_menu.IDUSER=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerTareasUsuario` (IN `id` INT)  NO SQL
BEGIN
	SELECT * FROM app_tareas WHERE IDUSER = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerUltimoArchivoSubido` ()  NO SQL
BEGIN
	SELECT * FROM app_archivos ORDER BY FECHA DESC LIMIT 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerUsuarios` ()  NO SQL
BEGIN
	SELECT * FROM app_users;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerUsuariosPrestadoresDeServicio` ()  NO SQL
BEGIN
	SELECT * FROM app_users WHERE IDTIPO = 2;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ponerUsuarioMenu` (IN `iduser` INT, IN `idmenu` INT)  NO SQL
BEGIN
	UPDATE app_menu SET app_menu.IDUSER=iduser WHERE app_menu.IDMENU=idmenu;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `quitarUsuarioMenu` (IN `id` INT)  NO SQL
BEGIN
	UPDATE app_menu SET app_menu.IDUSER=NULL WHERE IDMENU = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `validarNIPUserServicio` (IN `iduser` INT)  NO SQL
SELECT NIP FROM app_users WHERE app_users.IDUSER=iduser$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_archivos`
--

CREATE TABLE `app_archivos` (
  `IDARCHIVO` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `EXTENSION` varchar(10) NOT NULL,
  `PATH` varchar(50) NOT NULL,
  `FECHA` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `app_archivos`
--

INSERT INTO `app_archivos` (`IDARCHIVO`, `NOMBRE`, `EXTENSION`, `PATH`, `FECHA`) VALUES
(27, '1628398379_809070_1628398379', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-07 23:52:59'),
(28, '1628398538_264639_1628398538', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-07 23:55:38'),
(29, '1628398794_548302_1628398794', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-07 23:59:54'),
(30, '1628399091_576553_1628399091', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 00:04:50'),
(31, '1628399109_115545_1628399109', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 00:05:09'),
(32, '1628463409_287210_1628463409', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 17:56:49'),
(33, '1628463674_462426_1628463674', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:01:14'),
(34, '1628463677_512087_162846367', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:01:17'),
(35, '1628463695_605553_1628463695', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:01:35'),
(36, '1628463703_202257_162846370', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:01:43'),
(37, '1628463885_895656_1628463885', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:04:45'),
(38, '1628463891_176851_162846389', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:04:51'),
(39, '1628464035_252734_1628464035', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:07:15'),
(40, '1628464129_481047_1628464129', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:08:49'),
(41, '1628464137_948940_162846413', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:08:57'),
(42, '1628464482_758914_1628464482', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:14:42'),
(43, '1628464557_355907_1628464557', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:15:57'),
(44, '1628464699_712113_1628464699', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:18:19'),
(45, '1628464704_144376_1628464704', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:18:24'),
(46, '1628464708_541479_1628464708', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:18:28'),
(47, '1628464711_108700_1628464711', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:18:31'),
(48, '1628464840_367883_1628464840', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:20:40'),
(49, '1628464845_431564_1628464845', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:20:45'),
(50, '1628464852_400829_1628464852', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:20:52'),
(51, '1628464857_840395_1628464857', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:20:57'),
(52, '1628464860_802479_1628464860', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:21:00'),
(53, '1628465063_186576_1628465063', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:24:23'),
(54, '1628465222_589059_1628465222', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:27:02'),
(55, '1628465226_804744_1628465226', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:27:06'),
(56, '1628465234_462609_1628465234', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:27:14'),
(57, '1628465239_584696_1628465239', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:27:19'),
(58, '1628465332_738677_1628465332', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:28:52'),
(59, '1628465348_696427_1628465348', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:29:08'),
(60, '1628465355_919619_1628465355', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:29:15'),
(61, '1628465359_127144_1628465359', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:29:19'),
(62, '1628465364_943557_1628465364', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:29:24'),
(63, '1628465731_720296_1628465731', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:35:31'),
(64, '1628465734_119447_1628465734', '.jpg', 'C:xampphtdocsContador2archivos/', '2021-08-08 18:35:34'),
(65, '1628520131_228295_1628520131', '.png', 'C:xampphtdocsContador2archivos/', '2021-08-09 09:42:11'),
(66, '1628529677_330220_1628529677', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-09 12:21:17'),
(67, '1628529689_575503_1628529689', '.png', 'C:xampphtdocsContador2archivos/', '2021-08-09 12:21:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_catalogo_tipo_users`
--

CREATE TABLE `app_catalogo_tipo_users` (
  `IDTIPO` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `app_catalogo_tipo_users`
--

INSERT INTO `app_catalogo_tipo_users` (`IDTIPO`, `NOMBRE`) VALUES
(1, 'admin'),
(2, 'servicio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_contador_users`
--

CREATE TABLE `app_contador_users` (
  `IDCONTADOR` int(11) NOT NULL,
  `FECHAINICIO` datetime NOT NULL,
  `FECHA` date NOT NULL,
  `FECHAFIN` datetime DEFAULT NULL,
  `TIEMPO` time DEFAULT NULL,
  `ESTADO` binary(1) NOT NULL,
  `IDUSER` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `app_contador_users`
--

INSERT INTO `app_contador_users` (`IDCONTADOR`, `FECHAINICIO`, `FECHA`, `FECHAFIN`, `TIEMPO`, `ESTADO`, `IDUSER`) VALUES
(6, '2021-08-06 22:42:59', '2021-08-06', '2021-08-06 22:43:03', '00:00:04', 0x30, 1),
(7, '2021-08-06 22:51:23', '2021-08-06', '2021-08-06 22:59:01', '00:07:38', 0x30, 1),
(8, '2021-08-06 23:04:41', '2021-08-06', '2021-08-06 23:04:54', '00:00:12', 0x30, 1),
(9, '2021-08-07 01:46:47', '2021-08-07', '2021-08-07 01:46:53', '00:00:06', 0x30, 1),
(10, '2021-08-07 02:02:55', '2021-08-07', '2021-08-07 02:11:29', '00:08:34', 0x30, 1),
(11, '2021-08-07 02:11:37', '2021-08-07', '2021-08-07 02:11:47', '00:00:09', 0x30, 1),
(12, '2021-08-07 00:41:32', '2021-08-07', NULL, NULL, 0x31, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_estado_tareas`
--

CREATE TABLE `app_estado_tareas` (
  `IDESTADO` int(11) NOT NULL,
  `NOMBRE` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `app_estado_tareas`
--

INSERT INTO `app_estado_tareas` (`IDESTADO`, `NOMBRE`) VALUES
(1, 'ACTIVA'),
(2, 'FINALIZADA'),
(3, 'CANCELADA'),
(4, 'PENDIENTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_menu`
--

CREATE TABLE `app_menu` (
  `IDMENU` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `FECHA` datetime NOT NULL,
  `IDUSER` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `app_menu`
--

INSERT INTO `app_menu` (`IDMENU`, `NOMBRE`, `FECHA`, `IDUSER`) VALUES
(1, 'Home Deport', '2021-08-07 11:35:31', 3),
(3, 'Walmart', '2021-08-07 11:36:23', NULL),
(4, 'Liverpool', '2021-08-07 11:36:36', NULL),
(5, 'Palacio', '2021-08-07 11:41:00', NULL),
(6, 'Prueba', '2021-08-07 13:54:17', NULL),
(7, 'MenuAdmin', '2021-08-07 13:54:52', NULL),
(8, 'MenuPrueba3', '2021-08-07 13:56:02', NULL),
(9, 'MenuPrueba', '2021-08-08 17:57:17', NULL),
(10, 'Menu', '2021-08-08 17:58:39', NULL),
(11, 'wefw', '2021-08-09 09:31:49', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_menu_detalles`
--

CREATE TABLE `app_menu_detalles` (
  `IDDETALLE` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `ENLACE` varchar(50) NOT NULL DEFAULT '#',
  `ICONO` varchar(50) DEFAULT NULL,
  `NIVEL` int(11) NOT NULL,
  `IDMENU` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `app_menu_detalles`
--

INSERT INTO `app_menu_detalles` (`IDDETALLE`, `NOMBRE`, `ENLACE`, `ICONO`, `NIVEL`, `IDMENU`) VALUES
(673, 'Hogar', '#', 'fas fa-home', 0, 1),
(674, 'Autos', '#', 'fas fa-car', 0, 1),
(675, 'Mecánicos', '#', 'fas fa-child', 1, 1),
(676, 'Electrónicos', '#', 'fas fa-desktop', 0, 1),
(677, 'Computadoras', 'https://www.google.com', 'fas fa-desktop', 1, 1),
(678, 'Televisiones', '#', 'fas fa-desktop', 1, 1),
(679, 'Microondas', '#', 'fas fa-desktop', 1, 1),
(695, 'Hola', '#', 'fas fa-car', 0, 10),
(696, 'Hola2', '#', 'fas fa-envelope', 1, 10),
(698, 'Hola', '#', '', 0, 9),
(699, 'Hola2', '#', '', 0, 9),
(700, 'Hola2.1', '#', 'fas fa-archive', 1, 9),
(701, '', '#', '', 0, 9),
(706, 'Prueba', '#', '', 0, 11),
(707, 'Prueba', '#', '', 1, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_tareas`
--

CREATE TABLE `app_tareas` (
  `IDTAREA` int(11) NOT NULL,
  `TAREA` longtext NOT NULL,
  `FECHA` date NOT NULL,
  `COMENTARIO` longtext DEFAULT NULL,
  `IDESTADO` int(11) NOT NULL DEFAULT 1,
  `IDUSER` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `app_tareas`
--

INSERT INTO `app_tareas` (`IDTAREA`, `TAREA`, `FECHA`, `COMENTARIO`, `IDESTADO`, `IDUSER`) VALUES
(1, 'Crear base de datos', '2021-08-06', '', 1, 1),
(2, 'Modificar página', '2021-08-07', '', 2, 1),
(3, 'Checar que funcione', '2021-08-07', NULL, 1, 1),
(4, 'Modificar gráfica', '2021-08-18', NULL, 1, 1),
(5, 'Checar funcionamiento', '2021-08-11', NULL, 1, 1),
(6, 'Hacer esto', '2021-08-11', '', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app_users`
--

CREATE TABLE `app_users` (
  `IDUSER` int(11) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `APELLIDOS` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `NIP` int(4) DEFAULT NULL,
  `FOTO` varchar(100) NOT NULL,
  `IDTIPO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `app_users`
--

INSERT INTO `app_users` (`IDUSER`, `USERNAME`, `NOMBRE`, `APELLIDOS`, `EMAIL`, `PASSWORD`, `NIP`, `FOTO`, `IDTIPO`) VALUES
(1, 'ricardobaezac', 'José Ricardo', 'Baeza Candor', 'ricardobaezac10.24@gmail.com', '1234', 1234, 'img/1638125298__545474_1638125298.jpg', 2),
(2, 'marcoe', 'Marco Antonio', 'Eleno Tovar', 'marcoe@gmail.com', '1234', 4321, 'img/71623825297__5323474_1612225297.jpg', 2),
(3, 'admin', 'José Ricardo', 'Baeza Candor', 'ricardobaezac10.24@gmail.com', '1234', NULL, 'img/1638125298__545474_1638125298.jpg', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `app_archivos`
--
ALTER TABLE `app_archivos`
  ADD PRIMARY KEY (`IDARCHIVO`);

--
-- Indices de la tabla `app_catalogo_tipo_users`
--
ALTER TABLE `app_catalogo_tipo_users`
  ADD PRIMARY KEY (`IDTIPO`);

--
-- Indices de la tabla `app_contador_users`
--
ALTER TABLE `app_contador_users`
  ADD PRIMARY KEY (`IDCONTADOR`);

--
-- Indices de la tabla `app_estado_tareas`
--
ALTER TABLE `app_estado_tareas`
  ADD PRIMARY KEY (`IDESTADO`);

--
-- Indices de la tabla `app_menu`
--
ALTER TABLE `app_menu`
  ADD PRIMARY KEY (`IDMENU`);

--
-- Indices de la tabla `app_menu_detalles`
--
ALTER TABLE `app_menu_detalles`
  ADD PRIMARY KEY (`IDDETALLE`);

--
-- Indices de la tabla `app_tareas`
--
ALTER TABLE `app_tareas`
  ADD PRIMARY KEY (`IDTAREA`);

--
-- Indices de la tabla `app_users`
--
ALTER TABLE `app_users`
  ADD PRIMARY KEY (`IDUSER`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `app_archivos`
--
ALTER TABLE `app_archivos`
  MODIFY `IDARCHIVO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `app_catalogo_tipo_users`
--
ALTER TABLE `app_catalogo_tipo_users`
  MODIFY `IDTIPO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `app_contador_users`
--
ALTER TABLE `app_contador_users`
  MODIFY `IDCONTADOR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `app_estado_tareas`
--
ALTER TABLE `app_estado_tareas`
  MODIFY `IDESTADO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `app_menu`
--
ALTER TABLE `app_menu`
  MODIFY `IDMENU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `app_menu_detalles`
--
ALTER TABLE `app_menu_detalles`
  MODIFY `IDDETALLE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=708;

--
-- AUTO_INCREMENT de la tabla `app_tareas`
--
ALTER TABLE `app_tareas`
  MODIFY `IDTAREA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `app_users`
--
ALTER TABLE `app_users`
  MODIFY `IDUSER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
