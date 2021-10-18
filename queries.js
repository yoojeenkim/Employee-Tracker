const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Root123',
        database: 'company_db'
    }
);

function Queries() {
    this.viewEmployees = () => {
        db.promise().query('SELECT * FROM employees')
            .then( ([results, fields]) => {
                console.table(results);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    this.viewRoles = () => {
        db.promise().query('SELECT * FROM roles')
            .then( ([results, fields]) => {
                console.table(results);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    this.viewDepartments = () => {
        db.promise().query('SELECT * FROM departments')
            .then( ([results, fields]) => {
                console.table(results);
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

module.exports = Queries;