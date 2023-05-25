--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists trips; 
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


