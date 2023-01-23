CREATE USER normal_user WITH PASSWORD 'normal_pwd_crypt';
CREATE DATABASE normal_user;
GRANT ALL PRIVILEGES ON DATABASE normal_user TO normal_user;

-- SET search_path TO public;

-- DROP TABLE IF EXISTS students;

-- CREATE TABLE students (
--     id BIGSERIAL PRIMARY KEY,
--     name VARCHAR(255),
--     email VARCHAR(255)
-- );

-- INSERT INTO
--     students(name, email)
-- VALUES
--     ('AAA', 'aaa-01@student.com'),
--     ('BBB', 'bbb-02@student.com'),
--     ('CCC', 'ccc-03@student.com');

-- ;