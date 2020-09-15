USE employees;

INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Accounting'),
    ('Inventory')
;

INSERT INTO job (title, salary, departments_id)
VALUES
    ('Sales Manager', 10, 1),
    ('Sales Person', 5, 1),
    ('Accounting Manager', 10, 2),
    ('Accountant', 5, 2),
    ('Stock Manager', 10, 3),
    ('Stocker', 5, 3)
;

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES
    ('Jo', 'Star', 1, null),
    ('JoJo', 'Star', 2, 1), 
    ('Joo', 'Star', 3, null),
    ('JooJoo', 'Star', 4, 3),
    ('Jooo', 'Star', 5, null),
    ('Freeziepop', 'Frizbee', 6, 5),
    ('SuperSand', 'Lebanese', 6, 5),
    ('Kakacrabbie', 'Patty', 6, 5)
;