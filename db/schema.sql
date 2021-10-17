DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id INT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
)

-- CREATE TABLE employees (
--     id INT,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INT,
--     manager_id INT,
--     PRIMARY KEY (id),
--     FOREIGN KEY (role_id)
--     REFERENCES roles(id)
--     ON DELETE SET NULL,
--     FOREIGN KEY (manager_id)
--     REFERENCES employees(id)
--     ON DELETE SET NULL
-- )