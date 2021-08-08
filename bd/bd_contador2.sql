-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-08-2021 a las 22:33:48
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
(31, '1628399109_115545_1628399109', '.jpeg', 'C:xampphtdocsContador2archivos/', '2021-08-08 00:05:09');

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
(8, 'MenuPrueba3', '2021-08-07 13:56:02', NULL);

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
(679, 'Microondas', '#', 'fas fa-desktop', 1, 1);

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
(4, 'Modificar gráfica', '2021-08-18', NULL, 1, 1);

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
  MODIFY `IDARCHIVO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
  MODIFY `IDMENU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `app_menu_detalles`
--
ALTER TABLE `app_menu_detalles`
  MODIFY `IDDETALLE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=680;

--
-- AUTO_INCREMENT de la tabla `app_tareas`
--
ALTER TABLE `app_tareas`
  MODIFY `IDTAREA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `app_users`
--
ALTER TABLE `app_users`
  MODIFY `IDUSER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
