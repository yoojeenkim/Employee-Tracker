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
        db.promise().query('SELECT * FROM employees')
            .then( ([results, fields]) => {
                console.table(results);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    addEmployee = (res) => {
        const params = [];
        db.promise().query('INSERT INTO employees', params, (err, result) => {

        });
    }
    updateEmployee = (res) => {
        const params = [];
        db.promise().query('UPDATE  SET ', params, (err, result) => {

        });
    }
    viewRoles = () => {
        db.promise().query('SELECT * FROM roles')
            .then( ([results, fields]) => {
                console.table(results);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    addRole = (res) => {
        const params = [res.rolename, res.rolesalary, res.roledepartment];

        db.promise().query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, 4)', params, (err, result) => {
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
        const params = [];

        db.promise().query('INSERT INTO departments', params, (err, result) => {

        });
    }
    callEmployees = () => {
        db.promise().query('SELECT employees.first_name, employees.last_name FROM employees')
            .then( ([results, fields]) => {
                return results;
            })
            .catch((err) => {
                console.error(err);
            });
    }
    callRoles = () => {
        db.promise().query('SELECT roles.title FROM roles')
            .then( ([results, fields]) => {
                return results;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

module.exports = Queries;