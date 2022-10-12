-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-10-2022 a las 01:57:38
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `disney_world`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `weigth` int(11) DEFAULT NULL,
  `history` longtext DEFAULT NULL,
  `image` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `characters`
--

INSERT INTO `characters` (`id`, `name`, `age`, `weigth`, `history`, `image`) VALUES
(1, 'luca', 13, NULL, 'Luca Paguro es un monstruo marino antropomórfico de 13 años con una curiosidad infinita, especialmente cuando se trata del misterioso mundo que hay sobre el mar. Aunque toda su vida le han advertido de que el mundo de los humanos es un lugar peligroso, algo más que su tranquila vida en la granja donde pastorea peces cabra día tras día. Así que cuando otro monstruo marino con experiencia real sobre la superficie toma a Luca bajo su aleta, sus ojos se abren a todo un mundo de posibilidades', 'luca.jpg'),
(2, 'Blancanieves', 14, 0, 'Blancanieves es un personaje ficticio y la protagonista del largometraje animado Snow White and the Seven Dwarfs de The Walt Disney Company estrenado el 21 de diciembre de 1937. El personaje de Blancanieves se derivó de un cuento de hadas conocido en muchos países de Europa, siendo la versión más conocida el cuento de 1812 recopilado por los Hermanos Grimm.\n\nBlancanieves forma parte de la franquicia de las Princesas Disney y de hecho ella fue la primera princesa de Disney Company, además de ser el primer personaje femenino ficticio con una estrella en el Paseo de la fama de Hollywood.2​ Con el título de \"La más bella de todas\", ha seguido inspirando rasgos similares en futuras heroínas de Disney, como cantar para expresar sus emociones y comunicarse con animalitos slvestres.', 'Blancanieves.jpg'),
(3, 'Meilin “Mei” Lee', 13, 0, 'Exuberante, ambiciosa y exitosa en sus objetivos, Mei Lee es una niña que sobresale en la escuela y en el hogar. Su grupo de leales amigas siempre la respalda e incluso comparten su fanatismo por la banda 4*Town.\n\nEn su casa, Mei es una guardiana obediente y motivada del templo ancestral de la familia Lee. Trabaja contenta junto a su madre Ming.\n\nPero la abrupta y mágica aparición del panda rojo gigante en ella hace que todo cambie para siempre, ya que se convierte en un ser más vulnerable, caótico y verdaderamente auténtico.', NULL),
(4, 'pinocho', 0, 0, 'Pinocho es una marioneta, creado a partir de un tronco de pino, por el anciano Geppetto. Mientras Geppetto duerme, aparece el Hada Azul, quien beneficia a Geppetto por ser una buena persona dando vida al muñeco de madera. El Hada le dice que puede convertirse en un níño de verdad si es bueno.', 'pinocho.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `image` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genres`
--

INSERT INTO `genres` (`id`, `name`, `image`) VALUES
(1, 'action', 'action.jpg'),
(2, 'romance', 'romance.jpg'),
(3, 'comedy', 'comedy.jpg'),
(4, 'terror', 'terror.jpg'),
(5, 'galactic', 'galactic.jpg'),
(6, 'princess', 'princess.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `tittle` varchar(45) NOT NULL,
  `dateCreation` date DEFAULT NULL,
  `calification` int(11) DEFAULT 1,
  `image` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`id`, `tittle`, `dateCreation`, `calification`, `image`) VALUES
(1, 'Encanto', '2021-11-21', 3, 'encanto.jpg'),
(2, 'Red', '2022-02-18', 4, 'red.jpg'),
(3, 'Pinocho', '2022-09-08', 2, 'pinocho.jpg'),
(4, 'blanca nieves', '1937-12-21', 4, 'blancanieves.jpg'),
(5, 'sirenita 1989', '1989-09-04', 5, 'sirenita1989.jpg'),
(6, 'enredados', '2010-11-14', 2, 'enredados.jpg'),
(7, 'blanca nieves', '1937-12-21', 4, 'blancanieves.jpg'),
(10, 'Luca', '2021-06-18', 5, 'Luca.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies_characters`
--

CREATE TABLE `movies_characters` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `characterId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies_characters`
--

INSERT INTO `movies_characters` (`id`, `movieId`, `characterId`) VALUES
(1, 10, 1),
(2, 4, 2),
(3, 2, 3),
(4, 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies_genres`
--

CREATE TABLE `movies_genres` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `genreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies_genres`
--

INSERT INTO `movies_genres` (`id`, `movieId`, `genreId`) VALUES
(4, 1, 1),
(5, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `create_at` date DEFAULT NULL,
  `delete_at` date DEFAULT NULL,
  `update_at` date DEFAULT NULL,
  `status` varchar(15) DEFAULT 'guest'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `create_at`, `delete_at`, `update_at`, `status`) VALUES
(3, 'genaromazur03@gmail.com', '$2b$10$RVjUhdx/9bFfI3QRVptrGuB/0/W2.r1AcddXMiYCbAs/VFfqeHQq2', '2022-10-12', NULL, '2022-10-12', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movies_characters`
--
ALTER TABLE `movies_characters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movieId_idx` (`movieId`),
  ADD KEY `fk_characterId_idx` (`characterId`);

--
-- Indices de la tabla `movies_genres`
--
ALTER TABLE `movies_genres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movies_genres_movieId_idx` (`movieId`),
  ADD KEY `fk_movies_genres_genreId_idx` (`genreId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `movies_characters`
--
ALTER TABLE `movies_characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `movies_genres`
--
ALTER TABLE `movies_genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `movies_characters`
--
ALTER TABLE `movies_characters`
  ADD CONSTRAINT `fk_movies_characters_characterId` FOREIGN KEY (`characterId`) REFERENCES `characters` (`id`),
  ADD CONSTRAINT `fk_movies_characters_movieId` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`);

--
-- Filtros para la tabla `movies_genres`
--
ALTER TABLE `movies_genres`
  ADD CONSTRAINT `fk_movies_genres_genreId` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_movies_genres_movieId` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
