-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-05-2021 a las 07:42:20
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `el_carbonero`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id_contacto` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `correo` text NOT NULL,
  `asunto` text NOT NULL,
  `descripcion` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id_contacto`, `nombre`, `correo`, `asunto`, `descripcion`, `created_at`, `updated_at`, `deleted`) VALUES
(1, 'Fredy ', 'fredy@gmail.com', 'Reservacion', 'Quiero hacer una fiesta rosa el dia 22 de mayo de 2021 a las 7 de la noche. Estara ocupado el local?', '2021-05-02 09:18:54', '2021-05-02 09:18:54', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblcargos`
--

CREATE TABLE `tblcargos` (
  `id_cargo` int(11) NOT NULL,
  `cod_cargo` varchar(20) NOT NULL,
  `nom_cargo` varchar(250) NOT NULL,
  `eliminable` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblcargos`
--

INSERT INTO `tblcargos` (`id_cargo`, `cod_cargo`, `nom_cargo`, `eliminable`, `created_at`, `updated_at`, `deleted`) VALUES
(2, '12563', 'Mesero', 0, '2021-05-01 12:44:58', '2021-05-01 12:44:58', NULL),
(3, '5632', 'Gerente', 0, '2021-05-02 08:19:46', '2021-05-02 08:19:46', NULL),
(4, '4563', 'Cocinero', 0, '2021-05-02 08:20:00', '2021-05-02 08:20:00', NULL),
(5, '7452', 'Cajero', 0, '2021-05-02 08:20:15', '2021-05-02 08:20:15', NULL),
(6, '3652', 'Repartidor', 0, '2021-05-02 09:06:52', '2021-05-02 09:06:52', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblcategorias`
--

CREATE TABLE `tblcategorias` (
  `id_categoria` int(11) NOT NULL,
  `cod_categoria` varchar(50) NOT NULL,
  `nom_categoria` text NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblcategorias`
--

INSERT INTO `tblcategorias` (`id_categoria`, `cod_categoria`, `nom_categoria`, `id_sucursal`, `created_at`, `updated_at`, `deleted`) VALUES
(1, '1231', 'Almuerzos', 1, '2021-05-01 14:33:08', '2021-05-01 14:33:08', '2021-05-01 14:41:00'),
(2, '1245', 'cATEGORIA PRUEBA', 1, '2021-05-01 14:42:08', '2021-05-01 14:42:08', '2021-05-01 14:42:00'),
(3, '1452', 'Almuerzos', 1, '2021-05-01 16:49:04', '2021-05-01 16:49:04', NULL),
(4, '7563', 'Cervezas', 1, '2021-05-02 08:20:26', '2021-05-02 08:20:26', NULL),
(5, '7126', 'Boquitas', 1, '2021-05-02 08:20:43', '2021-05-02 08:20:43', NULL),
(6, '7596', 'Cenas', 1, '2021-05-02 08:20:57', '2021-05-02 08:20:57', NULL),
(7, '4625', 'Tragos', 1, '2021-05-02 09:09:59', '2021-05-02 09:09:59', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbldepartamento`
--

CREATE TABLE `tbldepartamento` (
  `id_departamento` int(11) NOT NULL,
  `nombre_departamento` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL,
  `id_pais_DEP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbldepartamento`
--

INSERT INTO `tbldepartamento` (`id_departamento`, `nombre_departamento`, `created_at`, `updated_at`, `deleted`, `id_pais_DEP`) VALUES
(1, 'Ahuachapán', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(2, 'Santa Ana', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(3, 'Sonsonate', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(4, 'La Libertad', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(5, 'Chalatenango', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(6, 'San Salvador', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(7, 'Cuscatlán', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(8, 'La Paz', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(9, 'Cabañas', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(10, 'San Vicente', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(11, 'Usulután', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(12, 'Morazán', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(13, 'San Miguel', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1),
(14, 'La Unión', '2020-11-30 13:33:56', '2020-11-30 13:33:56', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbldeptos`
--

CREATE TABLE `tbldeptos` (
  `id_depto` int(11) NOT NULL,
  `cod_depto` varchar(20) NOT NULL,
  `nom_depto` varchar(100) NOT NULL,
  `jefe` varchar(250) DEFAULT NULL,
  `encargado` varchar(250) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbldeptos`
--

INSERT INTO `tbldeptos` (`id_depto`, `cod_depto`, `nom_depto`, `jefe`, `encargado`, `created_at`, `updated_at`, `deleted`) VALUES
(2, '123', 'Departamento de cocina', 'Julio andrade', 'Julio andrade', '2021-05-01 12:58:11', '2021-05-01 12:58:11', NULL),
(3, '4552', 'Departamento de atencion al cliente', 'Daniel giron', 'Daniel giron', '2021-05-02 08:24:40', '2021-05-02 08:24:40', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblempleado`
--

CREATE TABLE `tblempleado` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `correlativo` varchar(5) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `imagen` text DEFAULT NULL,
  `dui` varchar(11) NOT NULL,
  `fecha_de_nacimiento` date NOT NULL,
  `sueldo` float DEFAULT NULL,
  `id_area` int(11) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL,
  `id_tipo_empleado_EMP` int(11) NOT NULL,
  `id_estado_EMP` int(11) NOT NULL,
  `id_sexo_EMP` int(11) NOT NULL,
  `id_sucursal_EMP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblempleado`
--

INSERT INTO `tblempleado` (`id_empleado`, `nombre`, `apellido`, `codigo`, `correlativo`, `direccion`, `telefono`, `imagen`, `dui`, `fecha_de_nacimiento`, `sueldo`, `id_area`, `fecha_inicio`, `created_at`, `updated_at`, `deleted`, `id_tipo_empleado_EMP`, `id_estado_EMP`, `id_sexo_EMP`, `id_sucursal_EMP`) VALUES
(1, 'Fredy Mauricio', 'Benitez Orellana', '00000', '000', 'colonia las brisas', '7875575', NULL, '000000', '1990-04-13', NULL, 0, NULL, '2021-04-15 09:29:32', '2021-04-15 09:29:32', NULL, 1, 1, 2, 1),
(5, 'FREDYSS', 'BENITEZ ', '0218001', '1', 'COLONIA PRESITA', '7875-9666', 'img/608ec054c84d8_FREDY.jpg', '35465453-1', '1997-11-20', 600, 2, '2021-05-02', '2021-05-02 08:23:31', '2021-05-02 09:08:00', NULL, 4, 1, 2, 1),
(6, 'INGRID ROXANA', 'ARGUETA CLAROS', '0218002', '2', 'ATO NUEVO', '7978-5253', 'img/608eb6761194f_ROXANA.jpg', '37758554-6', '1997-09-11', 500, 3, '2021-05-02', '2021-05-02 08:25:58', '2021-05-02 08:25:58', NULL, 2, 1, 1, 1),
(7, 'JOSE ELIAS', 'GONZALES BLANCO', '0218003', '3', 'COLONIA MOLINO', '7485-9999', 'img/608eb6ad70b38_ELIAS.jpg', '53443524-4', '1997-03-20', 550, 2, '2021-05-02', '2021-05-02 08:26:53', '2021-05-02 08:26:53', NULL, 3, 1, 2, 1),
(8, 'TATIANA MARCELA', 'PORTILLO CUADRA', '0218004', '4', 'CIUDAD PACIFIC A', '7485-96', 'img/608ec0a5d6b46_atencion.jpg', '45645645-6', '1994-06-22', 500, 3, '2021-05-02', '2021-05-02 09:09:25', '2021-05-02 09:09:25', NULL, 2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblempresa`
--

CREATE TABLE `tblempresa` (
  `id_empresa` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `propietario` varchar(255) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono1` varchar(10) NOT NULL,
  `telefono2` varchar(10) NOT NULL,
  `website` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nit` varchar(18) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `timer` int(11) NOT NULL,
  `sms` int(11) NOT NULL,
  `ws` int(11) NOT NULL,
  `texto` text NOT NULL,
  `moneda` varchar(100) NOT NULL,
  `simbolo` varchar(10) NOT NULL,
  `mri` float NOT NULL,
  `mrs` float NOT NULL,
  `mes` float NOT NULL,
  `mei` float NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL,
  `id_municipio_EMP` int(11) NOT NULL,
  `forma_fiscal` int(11) NOT NULL,
  `control_interno` int(11) NOT NULL,
  `razon_social` varchar(100) NOT NULL,
  `giro` varchar(200) NOT NULL,
  `nrc` varchar(15) NOT NULL,
  `tipo_pag` int(11) NOT NULL,
  `tipo_facturacion` int(11) NOT NULL,
  `contado` int(11) NOT NULL,
  `credito` int(11) NOT NULL,
  `remisiones` int(11) NOT NULL,
  `seguros` int(11) NOT NULL,
  `logo_activo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblempresa`
--

INSERT INTO `tblempresa` (`id_empresa`, `nombre`, `propietario`, `direccion`, `telefono1`, `telefono2`, `website`, `email`, `nit`, `logo`, `timer`, `sms`, `ws`, `texto`, `moneda`, `simbolo`, `mri`, `mrs`, `mes`, `mei`, `created_at`, `updated_at`, `deleted`, `id_municipio_EMP`, `forma_fiscal`, `control_interno`, `razon_social`, `giro`, `nrc`, `tipo_pag`, `tipo_facturacion`, `contado`, `credito`, `remisiones`, `seguros`, `logo_activo`) VALUES
(1, 'EL CARBONERO', 'DANIEL GIRON', 'AVENIDA ROOSVELTH', '2669-1440', '2669-1440', 'el_carbonero.com', 'elcarbonero@gmail.com', '1217-210896-101-2', 'img/608da4fbedaa2_39588838_165831780923860_5876640808647524352_n.png', 0, 3000, 100, 'Estimado {paciente} le recordamos que el dia {fecha} tiene una cita con nosotros a las {hora}. Atte. Clinica', 'Dolares', '$', 5, 7, 5, 8, '2020-12-03 08:43:44', '2021-05-01 12:59:00', NULL, 81, 0, 1, '', '', '', 0, 0, 1, 1, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblmenu`
--

CREATE TABLE `tblmenu` (
  `id_menu` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `prioridad` int(11) NOT NULL,
  `icono` varchar(255) NOT NULL,
  `visible` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblmenu`
--

INSERT INTO `tblmenu` (`id_menu`, `nombre`, `prioridad`, `icono`, `visible`, `created_at`, `update_at`, `deleted`) VALUES
(1, 'Areas', 10, 'fa fa-building', 1, '2021-04-30 23:58:33', '2021-04-30 23:58:33', NULL),
(2, 'Cargos', 9, 'fa fa-users', 1, '2021-05-01 00:09:57', '2021-05-01 00:09:57', NULL),
(3, 'Empleados', 8, 'fa fa-users', 1, '2021-05-01 00:40:15', '2021-05-01 00:40:15', NULL),
(4, 'Configuraciones', 100, 'fa fa-gears', 1, '2021-05-01 11:21:55', '2021-05-01 11:21:55', NULL),
(5, 'Categorias', 6, 'fa fa-leaf', 1, '2021-05-01 13:32:36', '2021-05-01 13:32:36', NULL),
(6, 'Platillos', 5, 'fa fa-apple', 1, '2021-05-01 14:59:06', '2021-05-01 14:59:06', NULL),
(7, 'Contactos', 6, 'fa fa-wrench', 1, '2021-05-01 22:35:06', '2021-05-01 22:35:06', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblmodulo`
--

CREATE TABLE `tblmodulo` (
  `id_modulo` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `icono` varchar(255) NOT NULL,
  `mostrar_menu` tinyint(4) NOT NULL,
  `admin` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL,
  `id_menu_MOD` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblmodulo`
--

INSERT INTO `tblmodulo` (`id_modulo`, `nombre`, `descripcion`, `filename`, `icono`, `mostrar_menu`, `admin`, `created_at`, `updated_at`, `deleted`, `id_menu_MOD`) VALUES
(1, 'Admin Areas', 'Admin Areas', 'admin_deptos.php', '', 1, 1, '2021-05-01 00:01:59', '2021-05-01 00:01:59', NULL, 1),
(2, 'Agregar Area', 'Agregar Area', 'agregar_depto.php', '', 0, 0, '2021-05-01 00:01:59', '2021-05-01 00:01:59', NULL, 1),
(3, 'Editar Area', 'Editar Area', 'editar_depto.php', '', 0, 0, '2021-05-01 00:01:59', '2021-05-01 00:01:59', NULL, 1),
(4, 'Borrar Area', 'Borrar Area', 'borrar_depto.php', '', 0, 0, '2021-05-01 00:01:59', '2021-05-01 00:01:59', NULL, 1),
(5, 'Admin Cargo', 'Admin Cargo', 'admin_cargo.php', '', 1, 1, '2021-05-01 00:11:44', '2021-05-01 00:11:44', NULL, 2),
(6, 'Agregar Cargo', 'Agregar Cargo', 'agregar_cargo.php', '', 0, 0, '2021-05-01 00:11:44', '2021-05-01 00:11:44', NULL, 2),
(7, 'Editar Cargo', 'Editar Cargo', 'editar_cargo.php', '', 0, 0, '2021-05-01 00:11:44', '2021-05-01 00:11:44', NULL, 2),
(8, 'Borrar Cargo', 'Borrar Cargo', 'borrar_cargo.php', '', 0, 0, '2021-05-01 00:11:44', '2021-05-01 00:11:44', NULL, 2),
(9, 'Admin Empleados', 'Admin Empleados', 'admin_empleado.php', '', 1, 1, '2021-05-01 08:47:01', '2021-05-01 08:47:01', NULL, 3),
(10, 'Agregar Empleado', 'Agregar Empleado', 'agregar_empleado.php', '', 0, 0, '2021-05-01 08:47:01', '2021-05-01 08:47:01', NULL, 3),
(11, 'Editar Empleado', 'Editar Empleado', 'editar_empleado.php', '', 0, 0, '2021-05-01 08:47:01', '2021-05-01 08:47:01', NULL, 3),
(12, 'Ver Empleado', 'Ver Empleado', 'ver_empleado.php', '', 0, 0, '2021-05-01 08:47:01', '2021-05-01 08:47:01', NULL, 3),
(13, 'Estado Empleado', 'Estado Empleado', 'estado_empleado.php', '', 0, 0, '2021-05-01 08:47:01', '2021-05-01 08:47:01', NULL, 3),
(14, 'Usuarios', 'Administrar Usuarios', 'admin_usuario.php', '', 1, 1, '2021-05-01 11:24:44', '2021-05-01 11:24:44', NULL, 4),
(15, 'Eliminar Usuarios', 'Eliminar Usuarios', 'borrar_usuario.php', '', 0, 0, '2021-05-01 11:24:44', '2021-05-01 11:24:44', NULL, 4),
(16, 'Editar Usuarios', 'Editar Usuarios', 'editar_usuario.php', '', 0, 0, '2021-05-01 11:24:44', '2021-05-01 11:24:44', NULL, 4),
(17, 'Permisos Usuario', 'Permisos Usuario', 'permiso_usuario.php', '', 0, 0, '2021-05-01 11:24:44', '2021-05-01 11:24:44', NULL, 4),
(18, 'Agregar Usuario', 'Agregar Usuario', 'agregar_usuario.php', '', 0, 0, '2021-05-01 11:24:44', '2021-05-01 11:24:44', NULL, 4),
(19, 'Datos Carbonero', 'Datos Carbonero', 'admin_empresa.php', '', 1, 1, '2021-05-01 11:24:44', '2021-05-01 11:24:44', NULL, 4),
(20, 'Admin Categorias', 'Admin Categorias', 'admin_categoria.php', '', 1, 1, '2021-05-01 13:34:29', '2021-05-01 13:34:29', NULL, 5),
(21, 'Agregar Categoria', 'Agregar Categoria', 'agregar_categoria.php', '', 0, 0, '2021-05-01 13:34:29', '2021-05-01 13:34:29', NULL, 5),
(22, 'Editar Categoria', 'Editar Categoria', 'editar_categoria.php', '', 0, 0, '2021-05-01 13:34:29', '2021-05-01 13:34:29', NULL, 5),
(23, 'Borrar Categoria', 'Borrar Categoria', 'borrar_categortia.php', '', 0, 0, '2021-05-01 13:34:29', '2021-05-01 13:34:29', NULL, 5),
(24, 'Admin Platillos', 'Admin Platillos', 'admin_platillo.php', '', 1, 1, '2021-05-01 15:05:22', '2021-05-01 15:05:22', NULL, 6),
(25, 'Agregar Platillo', 'Agregar Platillo', 'agregar_platillo.php', '', 0, 0, '2021-05-01 15:05:22', '2021-05-01 15:05:22', NULL, 6),
(26, 'Editar Platillo', 'Editar Platillo', 'editar_platillo.php', '', 0, 0, '2021-05-01 15:05:22', '2021-05-01 15:05:22', NULL, 6),
(27, 'Ver Platillo', 'Ver Platillo', 'ver_platillo.php', '', 0, 0, '2021-05-01 15:05:22', '2021-05-01 15:05:22', NULL, 6),
(28, 'Borrar Platillo', 'Borrar Platillo', 'borrar_platillo.php', '', 0, 0, '2021-05-01 15:05:22', '2021-05-01 15:05:22', NULL, 6),
(32, 'Admin Contactos', 'Admin Contactos', 'admin_contacto..php', '', 1, 1, '2021-05-01 22:39:37', '2021-05-01 22:39:37', NULL, 7),
(33, 'Ver contacto', 'Ver contacto', 'ver_contacto.php', '', 0, 0, '2021-05-01 22:39:37', '2021-05-01 22:39:37', NULL, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblmunicipio`
--

CREATE TABLE `tblmunicipio` (
  `id_municipio` int(11) NOT NULL,
  `municipio` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL,
  `id_departamento_MUN` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblmunicipio`
--

INSERT INTO `tblmunicipio` (`id_municipio`, `municipio`, `created_at`, `updated_at`, `deleted`, `id_departamento_MUN`) VALUES
(1, 'Ahuachapán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(2, 'Jujutla', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(3, 'Atiquizaya', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(4, 'Concepción de Ataco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(5, 'El Refugio', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(6, 'Guaymango', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(7, 'Apaneca', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(8, 'San Francisco Menéndez', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(9, 'San Lorenzo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(10, 'San Pedro Puxtla', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(11, 'Tacuba', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(12, 'Turín', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 1),
(13, 'Candelaria de la Frontera', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(14, 'Chalchuapa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(15, 'Coatepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(16, 'El Congo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(17, 'El Porvenir', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(18, 'Masahuat', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(19, 'Metapán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(20, 'San Antonio Pajonal', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(21, 'San Sebastián Salitrillo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(22, 'Santa Ana', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(23, 'Santa Rosa Guachipilín', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(24, 'Santiago de la Frontera', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(25, 'Texistepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 2),
(26, 'Acajutla', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(27, 'Armenia', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(28, 'Caluco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(29, 'Cuisnahuat', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(30, 'Izalco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(31, 'Juayúa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(32, 'Nahuizalco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(33, 'Nahulingo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(34, 'Salcoatitán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(35, 'San Antonio del Monte', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(36, 'San Julián', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(37, 'Santa Catarina Masahuat', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(38, 'Santa Isabel Ishuatán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(39, 'Santo Domingo de Guzmán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(40, 'Sonsonate', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(41, 'Sonzacate', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 3),
(42, 'Alegría', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(43, 'Berlín', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(44, 'California', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(45, 'Concepción Batres', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(46, 'El Triunfo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(47, 'Ereguayquín', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(48, 'Estanzuelas', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(49, 'Jiquilisco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(50, 'Jucuapa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(51, 'Jucuarán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(52, 'Mercedes Umaña', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(53, 'Nueva Granada', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(54, 'Ozatlán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(55, 'Puerto El Triunfo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(56, 'San Agustín', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(57, 'San Buenaventura', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(58, 'San Dionisio', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(59, 'San Francisco Javier', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(60, 'Santa Elena', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(61, 'Santa María', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(62, 'Santiago de María', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(63, 'Tecapán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(64, 'Usulután', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 11),
(65, 'Carolina', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(66, 'Chapeltique', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(67, 'Chinameca', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(68, 'Chirilagua', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(69, 'Ciudad Barrios', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(70, 'Comacarán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(71, 'El Tránsito', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(72, 'Lolotique', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(73, 'Moncagua', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(74, 'Nueva Guadalupe', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(75, 'Nuevo Edén de San Juan', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(76, 'Quelepa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(77, 'San Antonio del Mosco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(78, 'San Gerardo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(79, 'San Jorge', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(80, 'San Luis de la Reina', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(81, 'San Miguel', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(82, 'San Rafael Oriente', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(83, 'Sesori', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(84, 'Uluazapa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 13),
(85, 'Arambala', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(86, 'Cacaopera', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(87, 'Chilanga', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(88, 'Corinto', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(89, 'Delicias de Concepción', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(90, 'El Divisadero', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(91, 'El Rosario', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(92, 'Gualococti', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(93, 'Guatajiagua', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(94, 'Joateca', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(95, 'Jocoaitique', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(96, 'Jocoro', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(97, 'Lolotiquillo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(98, 'Meanguera', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(99, 'Osicala', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(100, 'Perquín', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(101, 'San Carlos', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(102, 'San Fernando', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(103, 'San Francisco Gotera', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(104, 'San Isidro', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(105, 'San Simón', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(106, 'Sensembra', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(107, 'Sociedad', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(108, 'Torola', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(109, 'Yamabal', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(110, 'Yoloaiquín', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 12),
(111, 'La Unión', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(112, 'San Alejo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(113, 'Yucuaiquín', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(114, 'Conchagua', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(115, 'Intipucá', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(116, 'San José', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(117, 'El Carmen', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(118, 'Yayantique', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(119, 'Bolívar', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(120, 'Meanguera del Golfo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(121, 'Santa Rosa de Lima', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(122, 'Pasaquina', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(123, 'ANAMOROS', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(124, 'Nueva Esparta', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(125, 'El Sauce', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(126, 'Concepción de Oriente', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(127, 'Polorós', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(128, 'Lislique ', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 14),
(129, 'Antiguo Cuscatlán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(130, 'Chiltiupán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(131, 'Ciudad Arce', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(132, 'Colón', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(133, 'Comasagua', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(134, 'Huizúcar', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(135, 'Jayaque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(136, 'Jicalapa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(137, 'La Libertad', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(138, 'Santa Tecla', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(139, 'Nuevo Cuscatlán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(140, 'San Juan Opico', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(141, 'Quezaltepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(142, 'Sacacoyo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(143, 'San José Villanueva', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(144, 'San Matías', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(145, 'San Pablo Tacachico', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(146, 'Talnique', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(147, 'Tamanique', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(148, 'Teotepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(149, 'Tepecoyo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(150, 'Zaragoza', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 4),
(151, 'Agua Caliente', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(152, 'Arcatao', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(153, 'Azacualpa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(154, 'Cancasque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(155, 'Chalatenango', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(156, 'Citalá', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(157, 'Comapala', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(158, 'Concepción Quezaltepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(159, 'Dulce Nombre de María', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(160, 'El Carrizal', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(161, 'El Paraíso', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(162, 'La Laguna', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(163, 'La Palma', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(164, 'La Reina', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(165, 'Las Vueltas', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(166, 'Nueva Concepción', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(167, 'Nueva Trinidad', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(168, 'Nombre de Jesús', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(169, 'Ojos de Agua', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(170, 'Potonico', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(171, 'San Antonio de la Cruz', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(172, 'San Antonio Los Ranchos', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(173, 'San Fernando', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(174, 'San Francisco Lempa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(175, 'San Francisco Morazán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(176, 'San Ignacio', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(177, 'San Isidro Labrador', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(178, 'Las Flores', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(179, 'San Luis del Carmen', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(180, 'San Miguel de Mercedes', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(181, 'San Rafael', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(182, 'Santa Rita', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(183, 'Tejutla', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 5),
(184, 'Cojutepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(185, 'Candelaria', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(186, 'El Carmen', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(187, 'El Rosario', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(188, 'Monte San Juan', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(189, 'Oratorio de Concepción', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(190, 'San Bartolomé Perulapía', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(191, 'San Cristóbal', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(192, 'San José Guayabal', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(193, 'San Pedro Perulapán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(194, 'San Rafael Cedros', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(195, 'San Ramón', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(196, 'Santa Cruz Analquito', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(197, 'Santa Cruz Michapa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(198, 'Suchitoto', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(199, 'Tenancingo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 7),
(200, 'Aguilares', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(201, 'Apopa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(202, 'Ayutuxtepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(203, 'Cuscatancingo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(204, 'Ciudad Delgado', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(205, 'El Paisnal', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(206, 'Guazapa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(207, 'Ilopango', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(208, 'Mejicanos', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(209, 'Nejapa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(210, 'Panchimalco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(211, 'Rosario de Mora', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(212, 'San Marcos', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(213, 'San Martín', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(214, 'San Salvador', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(215, 'Santiago Texacuangos', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(216, 'Santo Tomás', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(217, 'Soyapango', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(218, 'Tonacatepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 6),
(219, 'Zacatecoluca', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(220, 'Cuyultitán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(221, 'El Rosario', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(222, 'Jerusalén', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(223, 'Mercedes La Ceiba', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(224, 'Olocuilta', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(225, 'Paraíso de Osorio', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(226, 'San Antonio Masahuat', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(227, 'San Emigdio', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(228, 'San Francisco Chinameca', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(229, 'San Pedro Masahuat', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(230, 'San Juan Nonualco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(231, 'San Juan Talpa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(232, 'San Juan Tepezontes', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(233, 'San Luis La Herradura', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(234, 'San Luis Talpa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(235, 'San Miguel Tepezontes', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(236, 'San Pedro Nonualco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(237, 'San Rafael Obrajuelo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(238, 'Santa María Ostuma', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(239, 'Santiago Nonualco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(240, 'Tapalhuaca', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 8),
(241, 'Cinquera', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 9),
(242, 'Dolores', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 9),
(243, 'Guacotecti', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 9),
(244, 'Ilobasco', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 9),
(245, 'Jutiapa', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 9),
(246, 'San Isidro', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 9),
(247, 'Sensuntepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 9),
(248, 'Tejutepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 9),
(249, 'Victoria', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 9),
(250, 'Apastepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(251, 'Guadalupe', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(252, 'San Cayetano Istepeque', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(253, 'San Esteban Catarina', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(254, 'San Ildefonso', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(255, 'San Lorenzo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(256, 'San Sebastián', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(257, 'San Vicente', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(258, 'Santa Clara', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(259, 'Santo Domingo', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(260, 'Tecoluca', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(261, 'Tepetitán', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10),
(262, 'Verapaz', '2020-11-30 13:37:39', '2020-11-30 13:37:39', NULL, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblpais`
--

CREATE TABLE `tblpais` (
  `id_pais` int(11) NOT NULL,
  `pais` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblpais`
--

INSERT INTO `tblpais` (`id_pais`, `pais`, `created_at`, `updated_at`, `deleted`) VALUES
(1, 'EL SALVADOR', '2020-11-30 13:31:00', '2020-11-30 13:31:00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblplatillos`
--

CREATE TABLE `tblplatillos` (
  `id_platillo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` float NOT NULL,
  `imagen` text NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblplatillos`
--

INSERT INTO `tblplatillos` (`id_platillo`, `nombre`, `descripcion`, `precio`, `imagen`, `id_categoria`, `activo`, `created_at`, `updated_at`, `deleted`) VALUES
(5, 'Boca de chicharrones con salchicha y chimol', 'Es una deliciosa boca de chicharrones con salchicha con chimol', 2.5, 'img/608eb894ac416_Boca1.jpg', 5, 1, '2021-05-02 08:27:49', '2021-05-02 08:27:49', NULL),
(6, 'Boquita de camarones empanizados', 'Ricos camarones empanizados', 2, 'img/608eb73d4628b_Boca2.jpg', 5, 1, '2021-05-02 08:29:17', '2021-05-02 08:29:17', NULL),
(7, 'Plato de cerdo', 'Delicioso plato de carne de cerdo', 7.5, 'img/608eb770e4036_CARNE2.jpg', 3, 1, '2021-05-02 08:30:08', '2021-05-02 08:30:08', NULL),
(8, 'Plato de pechuga de pollo', 'Delicioso plato de pechuga de pollo', 5, 'img/608eb7b1e3865_POLLO1.jpg', 3, 1, '2021-05-02 08:31:13', '2021-05-02 08:31:13', NULL),
(9, 'Banquete de carne de cerdo', 'Delicioso banquete de carne de cerdo', 35, 'img/608eb7d62f39b_CERDO1.jpg', 3, 1, '2021-05-02 08:31:50', '2021-05-02 08:31:50', NULL),
(10, 'Balde de cervezas corona', 'Balde de 6 unidades', 12, 'img/608eb817a0ea1_cerveza.jpg', 4, 1, '2021-05-02 08:32:55', '2021-05-02 08:32:55', NULL),
(11, 'Balde de cervezas pilsener', 'Balde de 8 unidades', 6.8, 'img/608eb8369eac1_pilsener.jpg', 4, 1, '2021-05-02 08:33:26', '2021-05-02 08:33:26', NULL),
(12, 'Shots de tequilas', 'Shot de tequila jose cuervo', 2, 'img/608eb85de48d1_tequila.jpg', 4, 1, '2021-05-02 08:34:05', '2021-05-02 08:34:05', NULL),
(13, 'Coctel x', 'Es un coctel delicioso', 5, 'img/608ec10832d57_coctel4.jpg', 7, 1, '2021-05-02 09:11:04', '2021-05-02 09:11:04', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblsexo`
--

CREATE TABLE `tblsexo` (
  `id_sexo` int(11) NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblsexo`
--

INSERT INTO `tblsexo` (`id_sexo`, `sexo`, `created_at`, `updated_at`, `deleted`) VALUES
(1, 'FEMENINO', '2020-12-03 09:27:39', '2020-12-03 09:27:39', NULL),
(2, 'MASCULINO', '2020-12-03 09:27:39', '2020-12-03 09:27:39', NULL),
(3, 'OTRO', '2020-12-03 09:27:39', '2020-12-03 09:27:39', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbltipo_usuario`
--

CREATE TABLE `tbltipo_usuario` (
  `id_tipo_usuario` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblusuario`
--

CREATE TABLE `tblusuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `usuario` varchar(60) NOT NULL,
  `password` text NOT NULL,
  `fecha_de_entrada` date NOT NULL,
  `hora_de_entrada` time NOT NULL,
  `imagen` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL,
  `id_tipo_usuario_USU` int(11) NOT NULL,
  `id_empleado_usuario` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  `id_sucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblusuario`
--

INSERT INTO `tblusuario` (`id_usuario`, `nombre`, `usuario`, `password`, `fecha_de_entrada`, `hora_de_entrada`, `imagen`, `created_at`, `updated_at`, `deleted`, `id_tipo_usuario_USU`, `id_empleado_usuario`, `activo`, `id_sucursal`) VALUES
(2, 'Administrador de Sistema', 'admin', 'f90d1250fd96b918b6d474a2e549510c', '2020-12-03', '09:01:43', '', '2020-12-03 09:02:53', '2020-12-10 10:49:00', NULL, 1, 1, 1, 1),
(5, 'elias', 'elias', '29a2b2e1849474d94d12051309c7b4d7', '2021-05-02', '08:48:07', NULL, '2021-05-02 08:48:07', '2021-05-02 08:48:07', NULL, 2, 7, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblusuario_modulo`
--

CREATE TABLE `tblusuario_modulo` (
  `id_modulo_usuario` int(11) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblusuario_modulo`
--

INSERT INTO `tblusuario_modulo` (`id_modulo_usuario`, `id_modulo`, `id_usuario`, `created_at`, `updated_at`, `deleted`) VALUES
(20, 32, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(21, 33, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(22, 20, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(23, 21, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(24, 22, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(25, 23, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(26, 24, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(27, 25, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(28, 26, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(29, 27, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL),
(30, 28, 5, '2021-05-02 08:48:24', '2021-05-02 08:48:24', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id_contacto`);

--
-- Indices de la tabla `tblcargos`
--
ALTER TABLE `tblcargos`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Indices de la tabla `tblcategorias`
--
ALTER TABLE `tblcategorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `tbldepartamento`
--
ALTER TABLE `tbldepartamento`
  ADD PRIMARY KEY (`id_departamento`);

--
-- Indices de la tabla `tbldeptos`
--
ALTER TABLE `tbldeptos`
  ADD PRIMARY KEY (`id_depto`);

--
-- Indices de la tabla `tblempleado`
--
ALTER TABLE `tblempleado`
  ADD PRIMARY KEY (`id_empleado`);

--
-- Indices de la tabla `tblempresa`
--
ALTER TABLE `tblempresa`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `tblmenu`
--
ALTER TABLE `tblmenu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indices de la tabla `tblmodulo`
--
ALTER TABLE `tblmodulo`
  ADD PRIMARY KEY (`id_modulo`);

--
-- Indices de la tabla `tblmunicipio`
--
ALTER TABLE `tblmunicipio`
  ADD PRIMARY KEY (`id_municipio`);

--
-- Indices de la tabla `tblpais`
--
ALTER TABLE `tblpais`
  ADD PRIMARY KEY (`id_pais`);

--
-- Indices de la tabla `tblplatillos`
--
ALTER TABLE `tblplatillos`
  ADD PRIMARY KEY (`id_platillo`);

--
-- Indices de la tabla `tblsexo`
--
ALTER TABLE `tblsexo`
  ADD PRIMARY KEY (`id_sexo`);

--
-- Indices de la tabla `tblusuario`
--
ALTER TABLE `tblusuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `tblusuario_modulo`
--
ALTER TABLE `tblusuario_modulo`
  ADD PRIMARY KEY (`id_modulo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tblcargos`
--
ALTER TABLE `tblcargos`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tblcategorias`
--
ALTER TABLE `tblcategorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tbldepartamento`
--
ALTER TABLE `tbldepartamento`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tbldeptos`
--
ALTER TABLE `tbldeptos`
  MODIFY `id_depto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tblempleado`
--
ALTER TABLE `tblempleado`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tblempresa`
--
ALTER TABLE `tblempresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tblmenu`
--
ALTER TABLE `tblmenu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tblmodulo`
--
ALTER TABLE `tblmodulo`
  MODIFY `id_modulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `tblmunicipio`
--
ALTER TABLE `tblmunicipio`
  MODIFY `id_municipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=263;

--
-- AUTO_INCREMENT de la tabla `tblpais`
--
ALTER TABLE `tblpais`
  MODIFY `id_pais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tblplatillos`
--
ALTER TABLE `tblplatillos`
  MODIFY `id_platillo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tblsexo`
--
ALTER TABLE `tblsexo`
  MODIFY `id_sexo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tblusuario`
--
ALTER TABLE `tblusuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tblusuario_modulo`
--
ALTER TABLE `tblusuario_modulo`
  MODIFY `id_modulo_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
