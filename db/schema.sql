DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS employee;

DROP DATABASE IF EXISTS employee;
CREATE DATABASE employee;
USE employee;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    dept VARCHAR(30) NOT NULL
);

CREATE TABLE job (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER UNSIGNED,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

Create TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED NOT NULL,
    manager_id INTEGER UNSIGNED,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES job(id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES em
)