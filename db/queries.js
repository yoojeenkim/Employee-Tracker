const db = require("./connection");

class Queries {
    addEmployee = (res) => {
        const params = [res.firstname, res.lastname, res.employeerole, res.employeemanager];

        db.promise().query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, (SELECT id FROM roles WHERE title = ? ), (SELECT id FROM (SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ? ) AS tmptable))`, params, (err, result) => {
            if (err) {
                res.status(400).json({})
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }
    updateEmployee = (res) => {
        const params = [res.updatename, res.updaterole];
        db.promise().query(`UPDATE employees SET role_id = (SELECT id FROM roles WHERE title = ? ) WHERE id = (SELECT id FROM(SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ?) AS tmptable)`, params, (err, result) => {
            if (err) {
                res.status(400).json({})
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }
    addRole = (res) => {
        const params = [res.rolename, res.rolesalary, res.roledepartment];

        db.promise().query(`INSERT INTO roles(title, salary, department_id) VALUES ("${res.rolename}", "${res.rolesalary}",(SELECT id FROM departments WHERE department_name = "${res.roledepartment}"));`, params, (err, result) => {
            if (err) {
                res.status(400).json({})
            }
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