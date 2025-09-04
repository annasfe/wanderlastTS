--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists trips;
DROP TABLE if exists hotels; 
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE trips (
    id INT NOT NULL AUTO_INCREMENT, 
    location VARCHAR(40) not null,
    from_date DATETIME, 
    to_date DATETIME, 
    img VARCHAR(256),
    done BOOLEAN DEFAULT FALSE, 
    withwho VARCHAR(20),
    description VARCHAR(350),
    PRIMARY KEY (id)
);

CREATE TABLE hotels (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    url VARCHAR(256),
    price INT,
    trip_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE
);

INSERT INTO `trips` VALUES (2,'Utrecht','2023-06-03 00:00:00','2023-06-07 00:00:00','https://images.unsplash.com/photo-1489747125620-900d12828f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxVdHJlY2h0fGVufDB8MHx8fDE2ODUwMTkwMjh8MA&ixlib=rb-4.0.3&q=80&w=400',1,'family',''),(3,'Barcelona','2023-07-07 00:00:00','2023-07-31 00:00:00','https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxCYXJjZWxvbmF8ZW58MHwwfHx8MTY4NTAxOTA1MXww&ixlib=rb-4.0.3&q=80&w=400',0,'family',''),(8,'Brussels','2023-05-31 00:00:00','2023-06-03 00:00:00','https://images.unsplash.com/photo-1548092304-e0205cb0031b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxCcnVzc2Vsc3xlbnwwfDB8fHwxNjg1Mzc0NjA0fDA&ixlib=rb-4.0.3&q=80&w=400',1,'family','');
