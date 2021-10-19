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
            })
    }
    addEmployee = () => {
        db.promise().query('INSERT INTO employees (first_name, las')
    }
    updateEmployee = () => {
        db.promise().query('')
    }
    viewRoles = () => {
        db.promise().query('SELECT * FROM roles')
            .then( ([results, fields]) => {
                console.table(results);
            })
            .catch((err) => {
                console.error(err);
            })
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
            })
    }
    addDepartment = () => {
        db.promise().query('')
    }
}

module.exports = Queries;