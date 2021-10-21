const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Root123',
        database: 'company_db'
    }
);

class Queries {
    viewEmployees = () => {
        db.promise().query(`SELECT E.id, E.first_name, E.last_name, R.title, R.salary, D.name AS "department" FROM employees E LEFT JOIN roles R ON R.id = E.role_id LEFT JOIN departments D ON D.id = R.department_id;`)
            .then( ([results, fields]) => {
                console.table(results);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    addEmployee = (res) => {
        const params = [res.firstname, res.lastname, res.employeerole, res.employeemanager];

        db.promise().query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', params, (err, result) => {
            if (err) {
                res.status(400).json({})
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }
    updateEmployee = (res) => {
        const params = [];
        db.promise().query('UPDATE employees SET role_id = ? WHERE first_name = ?', params, (err, result) => {
            if (err) {
                res.status(400).json({})
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }
    viewRoles = () => {
        db.promise().query('SELECT R.id, R.title, R.salary, D.name AS "deparment" FROM roles R LEFT JOIN departments D ON D.id = R.department_id;')
            .then( ([results, fields]) => {
                console.table(results);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    addRole = (res) => {
        const params = [res.rolename, res.rolesalary, res.roledepartment];

        db.promise().query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', params, (err, result) => {
            if (err) {
                res.status(400).json({})
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }
    viewDepartments = () => {
        db.promise().query('SELECT * FROM departments')
            .then( ([results, fields]) => {
                console.table(results);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    addDepartment = (res) => {
        const params = [res.departmentname];

        db.promise().query('INSERT INTO departments (name) VALUES (?)', params, (err, result) => {
            if (err) {
                res.status(400).json({})
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }
}

module.exports = Queries;