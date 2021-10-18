INSERT INTO departments (id, `name`)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO roles (id, title, salary, department)
VALUES (1, "Sales Lead", 100000, 1),
       (2, "Salesperson", 80000, 1),
       (3, "Lead Engineer", 150000, 2),
       (4, "Software Engineer", 120000, 2),
       (5, "Account Manager", 160000, 3),
       (6, "Accountant", 125000, 3),
       (7, "Legal Team Lead", 250000, 4),
       (8, "Lawyer", 190000, 4);

INSERT INTO employees (id, first_name, last_name)
VALUES (1, "John", "Doe"),
       (2, "Mike", "Chan"),
       (3, "Ashley", "Rodriguez"),
       (4, "Kevin", "Tupik"),
       (5, "Kunal", "Singh"),
       (6, "Malia", "Brown"),
       (7, "Sarah", "Lourd"),
       (8, "Tom", "Allen");