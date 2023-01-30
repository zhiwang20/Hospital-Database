DROP DATABASE IF EXISTS hospitalTest01;
CREATE DATABASE hospitalTest01;
USE hospitalTest01;

-- Login Table
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    -- primary key cannot accept NULL value(user insertion below; UNIQUE can receive NULL), AUTO_INCREMENT helps this issue
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    -- Even though we will use an arbitrary numeric id, we will still have unique user names.
    email VARCHAR(30) UNIQUE NOT NULL,
    -- Password are not constrained to be unique, but we do require a user to have one.
    password VARCHAR(60) NOT NULL,
    -- preliminary type 
    kind VARCHAR(20),
    -- date created
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- Big brain idea: start the user ids at a nice big number so it looks like we have lots of users.
ALTER TABLE users AUTO_INCREMENT=11957;

-- department Table
DROP TABLE IF EXISTS department;
CREATE TABLE department(
    departmentName VARCHAR(20) PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(20) NOT NULL,
    fax VARCHAR(20) NOT NULL,
    chief VARCHAR(20) NOT NULL
);


-- Doctor Table; doctor can have same name
DROP TABLE IF EXISTS doctor;
CREATE TABLE doctor(
    doctorId VARCHAR(10) PRIMARY KEY,
    doctorName VARCHAR(20) NOT NULL,
    gender VARCHAR(2) NOT NULL,
    age VARCHAR(20) NOT NULL,
    education VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    department VARCHAR(20),
    accountId INTEGER UNIQUE,
    active BOOLEAN DEFAULT true,
    FOREIGN KEY(department) REFERENCES department(departmentName) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY(accountId) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Ward table
DROP TABLE IF EXISTS ward;
CREATE TABLE ward(
    wardId VARCHAR(8) UNIQUE PRIMARY KEY,
    wardLocation VARCHAR(20) NOT NULL,
    bedNumber VARCHAR(10) NOT NULL,
    department VARCHAR(20),
    FOREIGN KEY(department) REFERENCES department(departmentName) ON DELETE SET NULL ON UPDATE CASCADE
);
--  FOREIGN KEY(department) REFERENCES department(departmentName) ON UPDATE CASCADE
--  CONSTRAINT department_key FOREIGN KEY (department) REFERENCES department(departmentName) ON UPDATE CASCADE


-- Patient table
DROP TABLE IF EXISTS patient;
CREATE TABLE patient(
    patientId VARCHAR(10) UNIQUE PRIMARY KEY,
    patientName VARCHAR(20) NOT NULL,
    age VARCHAR(20) NOT NULL,
    gender VARCHAR(2) NOT NULL, 
    bloodType VARCHAR(4) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    patientAddress VARCHAR(20) NOT NULL,
    doctorId VARCHAR(20),
    patientType VARCHAR(20) NOT NULL, 
    department VARCHAR(20),
    -- wardId VARCHAR(8),
    FOREIGN KEY(department) REFERENCES department(departmentName) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY(doctorId) REFERENCES doctor(doctorId) ON DELETE SET NULL ON UPDATE CASCADE
);

-- ALTER TABLE patient AUTO_INCREMENT=890;
ALTER TABLE patient ADD wardId VARCHAR(10);
ALTER TABLE patient ADD CONSTRAINT FL_WARD
    FOREIGN KEY(wardId) REFERENCES ward(wardId) ON DELETE SET NULL ON UPDATE CASCADE;

-- Operatingroom table
DROP TABLE IF EXISTS operation;
CREATE TABLE operation(
    operationId INTEGER PRIMARY KEY AUTO_INCREMENT,
    startTime VARCHAR(20) NOT NULL,
    endTime VARCHAR(20) NOT NULL,
    result VARCHAR (20) NOT NULL,
    patientId VARCHAR(20),
    doctorId VARCHAR(10),
    operationType VARCHAR(30) NOT NULL,
    FOREIGN KEY(patientId) REFERENCES patient(patientId) ON UPDATE CASCADE,
    FOREIGN KEY(doctorId) REFERENCES doctor(doctorId) ON UPDATE CASCADE
);
ALTER TABLE operation AUTO_INCREMENT=890;

--  nurse Table
DROP TABLE IF EXISTS nurse;
CREATE TABLE nurse(
    nurseId VARCHAR(10) UNIQUE PRIMARY KEY,
    nurseName VARCHAR(20) NOT NULL,
    gender VARCHAR(2) NOT NULL, 
    age VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    accountId INTEGER UNIQUE,
    FOREIGN KEY(accountId) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- bed table
DROP TABLE IF EXISTS bed;
CREATE TABLE bed(
    bedId VARCHAR(20) UNIQUE PRIMARY KEY,
    nurseId VARCHAR(10),
    wardId VARCHAR(9),
    bedState VARCHAR(20) NOT NULL,
    FOREIGN KEY(nurseId) REFERENCES nurse(nurseID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY(wardId) REFERENCES ward(wardId) ON DELETE SET NULL ON UPDATE CASCADE
);

-- cascade?

DELIMITER $$
CREATE FUNCTION get_user_id_from_email(userEmail VARCHAR(20))
RETURNS INTEGER
DETERMINISTIC
BEGIN
    RETURN (SELECT id FROM users WHERE email = userEmail);
END $$
DELIMITER ;


-- {{{ Insert users data.
INSERT INTO users VALUES (NULL, 'lxx@gmail.com', 'wang007', 'origin', '2016-01-01 01:01:01');
INSERT INTO users VALUES (NULL, 'wxx@gmail.com', 'ssual007', 'origin', '2016-01-01 01:01:01');
INSERT INTO users VALUES (NULL, 'axx@gmail.com', 'hao007', 'origin', '2016-01-01 01:01:01');
INSERT INTO users VALUES (NULL, 'txx@gmail.com', 'test1', 'origin', '2016-01-01 01:01:01');
INSERT INTO users VALUES (NULL, 'dxx@gmail.com', 'test2', 'origin', '2016-01-01 01:01:01');
INSERT INTO users VALUES (NULL, 'zxx@gmail.com', 'test3', 'origin', '2016-01-01 01:01:01');

-- {{{ Insert department data.
INSERT INTO department VALUES ('Emergency', '640-277-7777', 'D2-007', '020-222-0222', 'Lion');
INSERT INTO department VALUES ('Surgical', '640-277-8888', 'D2-008', '020-222-0111', 'Fion');
INSERT INTO department VALUES ('Orthopedics', '640-277-9999', 'D2-009', '020-222-0333', 'Tion');

-- {{{ Insert ward data. 
-- get_departmentName_from_departmentLocation('D2-008')?
INSERT INTO ward VALUES ('A1', 'W2-007', '4', 'Emergency');
INSERT INTO ward VALUES ('A2', 'W2-008', '4', 'Surgical');
INSERT INTO ward VALUES ('A3', 'W2-009', '4', 'Orthopedics');

-- {{{ Insert doctor data.
INSERT INTO doctor VALUES ( 'A001', 'LXX', 'M', '24', 'master',  
                            'lxx@gmail.com', '636-222-2490', 'Emergency', get_user_id_from_email('lxx@gmail.com'), true);
INSERT INTO doctor VALUES ( 'A002', 'WXX', 'F', '30', 'Phd',  
                            'wxx@gmail.com', '636-444-2490', 'Orthopedics', get_user_id_from_email('wxx@gmail.com'), true);
INSERT INTO doctor VALUES ( 'A003', 'AXX', 'M', '50', 'Phd',  
                            'axx@gmail.com', '636-214-2490', 'Surgical', get_user_id_from_email('axx@gmail.com'), true);

-- {{{ Insert patient data.
INSERT INTO patient VALUES ( 'P1', 'ALI XSS', '24', 'M', 'A', '646-222-2222', '633 XX STREET', 'A001', 'Acute appendicitis', 'Orthopedics', NULL);
INSERT INTO patient VALUES ('P2', 'ALI XXX', '26', 'F', 'B', '646-222-2333' , '622 XX STREET', 'A002', 'burn', 'Surgical', NULL);
INSERT INTO patient VALUES ( 'P3', 'ALI SSS', '28', 'M', 'O',  '646-222-2111', '222 XX STREET', 'A003', 'fracture', 'Emergency', 'A1');

-- {{{ Insert nurse data.
INSERT INTO nurse VALUES ( 'N001', 'XXL', 'M', '24',  
                            'txx@gmail.com', '212-222-2222', get_user_id_from_email('txx@gmail.com'));
INSERT INTO nurse VALUES ( 'N002', 'XXW', 'F', '30',  
                            'dxx@gmail.com', '212-222-3333', get_user_id_from_email('dxx@gmail.com'));
INSERT INTO nurse VALUES ( 'N003', 'XXS', 'M', '50',   
                            'zxx@gmail.com', '222-222-2221', get_user_id_from_email('zxx@gmail.com'));

-- {{{ Insert bed data.
INSERT INTO bed VALUES ( 'b001', 'N001', 'A1', 'NORMAL');
INSERT INTO bed VALUES ( 'b002', 'N002', 'A2', 'NORMAL');
INSERT INTO bed VALUES ( 'b003', 'N003', 'A3', 'NORMAL');

-- {{{ Insert operation data.
INSERT INTO operation VALUES ( NULL,  '2020/10/20 3AM', '2020/10/20, 4PM', 'GOOD', 'P1',  'A001', 'Appendix surgery');

-- patient
CREATE VIEW patientList AS 
    SELECT * FROM patient;
	
-- patient with out ward
CREATE VIEW patientWard AS 
    SELECT patient.patientName FROM patient
    where patient.wardId is null;