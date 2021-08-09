-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2021 a las 19:50:40
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
-- Base de datos: `bd_sbinarios`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarCategoria` (IN `nombre` VARCHAR(50), IN `slug` VARCHAR(20), IN `descripcion` LONGTEXT, IN `fecha` DATETIME)  NO SQL
BEGIN
	INSERT INTO ma_categorias(NOMBRE, SLUG, DESCRIPCION,FCAP) VALUES (nombre,slug,descripcion,fecha);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarSitio` (IN `nombre` VARCHAR(75), IN `descripcion` VARCHAR(250), IN `cliente` INT, IN `domicilio` VARCHAR(250), IN `ubicacion` VARCHAR(250), IN `contacto` VARCHAR(50), IN `telefono` VARCHAR(10), IN `fecha` DATETIME)  NO SQL
BEGIN
	INSERT INTO ma_sitios(NOMBRE,DESCRIPCION,CLIENTE, DOMICILIO,UBICACIONGPS,CONTACTO,TELEFONO,FCAP) VALUES (nombre,descripcion,cliente,domicilio,ubicacion,contacto,telefono,fecha);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerCategorias` ()  NO SQL
BEGIN
	SELECT * FROM ma_categorias;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerSitios` ()  NO SQL
BEGIN
	SELECT * FROM ma_sitios;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ca_dispositivos`
--

CREATE TABLE `ca_dispositivos` (
  `TIPOID` int(11) NOT NULL,
  `NOMBRE` varchar(75) NOT NULL,
  `ICONO` varchar(75) NOT NULL,
  `COMENTARIOS` varchar(512) DEFAULT NULL,
  `IP` varchar(25) DEFAULT NULL,
  `USUARIO` varchar(50) DEFAULT NULL,
  `PSWD` varchar(50) DEFAULT NULL,
  `UCAP` int(11) DEFAULT NULL,
  `FCAP` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='CATALOGO DE DISPOSITIVOS';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `de_dispositivos`
--

CREATE TABLE `de_dispositivos` (
  `AUTOID` int(11) NOT NULL,
  `SITIOID` int(11) NOT NULL,
  `TIPOID` int(11) NOT NULL,
  `FECHA` varchar(75) NOT NULL,
  `NOMBRE` varchar(75) NOT NULL,
  `COMENTARIOS` varchar(512) DEFAULT NULL,
  `IP` varchar(25) DEFAULT NULL,
  `USUARIO` varchar(50) DEFAULT NULL,
  `PSWD` varchar(50) DEFAULT NULL,
  `UCAP` int(11) DEFAULT NULL,
  `FCAP` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='DISPOSITIOS INSTALADOS POR SITIO';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ma_categorias`
--

CREATE TABLE `ma_categorias` (
  `CATID` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `DESCRIPCION` longtext DEFAULT NULL,
  `SLUG` varchar(20) NOT NULL,
  `CANTIDAD` int(11) NOT NULL DEFAULT 0,
  `UCAP` int(11) DEFAULT NULL,
  `FCAP` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ma_categorias`
--

INSERT INTO `ma_categorias` (`CATID`, `NOMBRE`, `DESCRIPCION`, `SLUG`, `CANTIDAD`, `UCAP`, `FCAP`) VALUES
(1, 'Ajustes de Portada', NULL, 'awards', 0, 1, '2021-08-06 00:59:01'),
(7, 'Ajustes de Usuario', NULL, 'league', 0, 1, '2021-08-06 01:46:11'),
(8, 'Ajustes de Login', NULL, 'masters', 0, NULL, '2021-08-06 01:54:50'),
(9, 'Records', NULL, 'records', 0, NULL, '2021-08-06 01:55:49'),
(10, 'Report', NULL, 'report', 0, NULL, '2021-08-06 01:56:07'),
(11, 'School', NULL, 'school', 0, NULL, '2021-08-06 01:56:24'),
(12, 'Sin categoría', NULL, 'sin-categoria', 0, NULL, '2021-08-06 01:56:51'),
(13, 'Transfers', NULL, 'transfers', 0, NULL, '2021-08-06 01:57:07'),
(14, 'Otras', NULL, 'otras', 0, NULL, '2021-08-06 02:01:15'),
(15, 'Pruebas', NULL, 'pruebas', 0, NULL, '2021-08-06 02:02:01'),
(24, 'Ajustes de Menú', NULL, 'menu', 0, NULL, '2021-08-06 02:20:20'),
(26, 'Ajustes de Header', '', 'prueba', 0, NULL, '2021-08-09 10:41:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ma_parametros`
--

CREATE TABLE `ma_parametros` (
  `PARAID` int(11) NOT NULL,
  `PARAMETRO` varchar(50) NOT NULL,
  `CONDICION` varchar(10) NOT NULL,
  `COMENTARIO` longtext NOT NULL,
  `VALOR` longtext NOT NULL,
  `UCAP` int(11) DEFAULT NULL,
  `FCAP` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ma_sitios`
--

CREATE TABLE `ma_sitios` (
  `SITIOID` int(11) NOT NULL,
  `NOMBRE` varchar(75) NOT NULL,
  `DESCRIPCION` varchar(250) DEFAULT NULL,
  `CLIENTE` int(11) NOT NULL DEFAULT 0,
  `DOMICILIO` varchar(250) DEFAULT NULL,
  `UBICACIONGPS` varchar(250) DEFAULT NULL,
  `CONTACTO` varchar(50) DEFAULT NULL,
  `TELEFONO` varchar(10) DEFAULT NULL,
  `UCAP` int(11) DEFAULT NULL,
  `FCAP` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='SITIO DE SERVICIO';

--
-- Volcado de datos para la tabla `ma_sitios`
--

INSERT INTO `ma_sitios` (`SITIOID`, `NOMBRE`, `DESCRIPCION`, `CLIENTE`, `DOMICILIO`, `UBICACIONGPS`, `CONTACTO`, `TELEFONO`, `UCAP`, `FCAP`) VALUES
(1, 'Juan', NULL, 0, 'Juan #43', 'Latitud:19.2512 Longitud:-103.73038079999999', 'Juan', '3123123123', NULL, '2021-08-06 12:58:20'),
(2, 'Liverpool', '', 1, 'Jardines #45', 'Latitud:19.264496599999998 Longitud:-103.73680569999999', 'Ricardo', '3121481633', NULL, '2021-08-09 12:08:51'),
(4, 'Liverpool', '', 2, 'Jardines #46', 'Latitud:19.2544768 Longitud:-103.7336576', 'Ricardo', '3121343223', NULL, '2021-08-09 12:11:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ma_usuarios`
--

CREATE TABLE `ma_usuarios` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(250) DEFAULT NULL,
  `EMAIL` varchar(250) DEFAULT NULL,
  `PSWD` varchar(50) DEFAULT NULL,
  `MENUACTIVO` int(11) NOT NULL DEFAULT 1,
  `SUCURSAL` int(11) NOT NULL DEFAULT 1,
  `DEPTO` int(11) NOT NULL DEFAULT 1,
  `TELEFONO` varchar(10) DEFAULT NULL,
  `ACTIVO` int(11) DEFAULT 1,
  `WADMIN` int(11) NOT NULL DEFAULT 0,
  `SYSADMIN` int(11) NOT NULL DEFAULT 0,
  `UCAP` int(11) DEFAULT NULL,
  `FCAP` datetime DEFAULT NULL,
  `UMOD` int(11) DEFAULT NULL,
  `FMOD` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ca_dispositivos`
--
ALTER TABLE `ca_dispositivos`
  ADD PRIMARY KEY (`TIPOID`);

--
-- Indices de la tabla `de_dispositivos`
--
ALTER TABLE `de_dispositivos`
  ADD PRIMARY KEY (`AUTOID`);

--
-- Indices de la tabla `ma_categorias`
--
ALTER TABLE `ma_categorias`
  ADD PRIMARY KEY (`CATID`);

--
-- Indices de la tabla `ma_parametros`
--
ALTER TABLE `ma_parametros`
  ADD PRIMARY KEY (`PARAID`);

--
-- Indices de la tabla `ma_sitios`
--
ALTER TABLE `ma_sitios`
  ADD PRIMARY KEY (`SITIOID`);

--
-- Indices de la tabla `ma_usuarios`
--
ALTER TABLE `ma_usuarios`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ca_dispositivos`
--
ALTER TABLE `ca_dispositivos`
  MODIFY `TIPOID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `de_dispositivos`
--
ALTER TABLE `de_dispositivos`
  MODIFY `AUTOID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ma_categorias`
--
ALTER TABLE `ma_categorias`
  MODIFY `CATID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `ma_parametros`
--
ALTER TABLE `ma_parametros`
  MODIFY `PARAID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ma_sitios`
--
ALTER TABLE `ma_sitios`
  MODIFY `SITIOID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ma_usuarios`
--
ALTER TABLE `ma_usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
