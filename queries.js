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
        db.promise().query('')
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
    addRole = () => {
        db.promise().query('')
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