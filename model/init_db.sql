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
    FOREIGN KEY (trip_id) REFERENCES trips (id) 
);

INSERT INTO `trips` VALUES (2,'Utrecht','2023-06-03 00:00:00','2023-06-07 00:00:00','https://images.unsplash.com/photo-1489747125620-900d12828f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxVdHJlY2h0fGVufDB8MHx8fDE2ODUwMTkwMjh8MA&ixlib=rb-4.0.3&q=80&w=400',1,'family',''),(3,'Barcelona','2023-07-07 00:00:00','2023-07-31 00:00:00','https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxCYXJjZWxvbmF8ZW58MHwwfHx8MTY4NTAxOTA1MXww&ixlib=rb-4.0.3&q=80&w=400',0,'family',''),(7,'Barcelona','2023-03-02 00:00:00','2023-03-13 00:00:00','https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxCYXJjZWxvbmF8ZW58MHwwfHx8MTY4NTM2NzU4Nnww&ixlib=rb-4.0.3&q=80&w=400',1,'family','Celebrate family birthdays!'),(8,'Brussels','2023-05-31 00:00:00','2023-06-03 00:00:00','https://images.unsplash.com/photo-1548092304-e0205cb0031b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxCcnVzc2Vsc3xlbnwwfDB8fHwxNjg1Mzc0NjA0fDA&ixlib=rb-4.0.3&q=80&w=400',1,'family',''),(9,'Llívia','2023-07-21 00:00:00','2023-07-25 00:00:00','https://images.unsplash.com/photo-1547478628-8ad9830c391c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxMbCVDMyVBRHZpYXxlbnwwfDB8fHwxNjg1NDQ0MDE5fDA&ixlib=rb-4.0.3&q=80&w=400',0,'family',''),(10,'Volos','2023-04-07 00:00:00','2023-04-09 00:00:00','https://images.unsplash.com/photo-1645093365173-7bd57d51f793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxWb2xvc3xlbnwwfDB8fHwxNjg1MzY0OTk5fDA&ixlib=rb-4.0.3&q=80&w=400',1,'girls',''),(11,'Igualada','2023-07-07 00:00:00','2023-07-09 00:00:00','https://images.unsplash.com/photo-1556237028-92db94625c46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxJZ3VhbGFkYXxlbnwwfDB8fHwxNjg1NDQ0NDYyfDA&ixlib=rb-4.0.3&q=80&w=400',0,'family',''),(12,'Paris',NULL,NULL,'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTE4MjJ8MHwxfHNlYXJjaHwxfHxQYXJpc3xlbnwwfDB8fHwxNjg1NDQ0NDgzfDA&ixlib=rb-4.0.3&q=80&w=400',0,'other','');
INSERT INTO `hotels` VALUES (5,'Los mejores parques infantiles','https://www.mammaproof.org/barcelona/los-mejores-parques-de-barcelona-para-ir-con-ninos/',0,3),(6,'Festivales de verano','https://www.mammaproof.org/barcelona/festivales-de-verano-para-vivir-en-familia/',0,3),(7,'Casales de verano','https://www.mammaproof.org/barcelona/los-mejores-casales-verano/',0,3);
