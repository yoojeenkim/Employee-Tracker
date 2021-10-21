const inquirer = require('inquirer');
const Queries = require('./db/queries.js');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Root123',
        database: 'company_db',
        multipleStatements: true
    }
);

const call = new Queries;

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'departmentname'
            }
        ])
        .then((res) => {
            call.addDepartment(res);
            console.log(`Successfully added ${res.departmentname}`);
        })
        .catch((err) => {
            console.error(err);
        })
        .then( () => {
            init();
        });
}

function viewDepartments() {
    db.promise().query('SELECT * FROM departments')
        .then( ([results, fields]) => {
            console.table(results);
        })
        .catch((err) => {
            console.error(err);
        })
        .then( () => {
            init();
        });
}

function addRole() {
    const sql = `SELECT title FROM roles`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        }

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role?',
                    name: 'rolename'
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'rolesalary'
                },
                {
                    type: 'list',
                    message: 'Which department does the role belong to?',
                    name: 'roledepartment',
                    choices: function() {
                        let roles = results.map(choice => choice.title);
                        return roles;
                    }
                }
            ])
            .then((res) => {
                call.addRole(res);
                console.log(`Sucessfully added ${res.rolename}`);
            })
            .catch((err) => {
                console.error(err);
            })
            .then( () => {
                init();
            });
    })
}

function viewRoles() {
    db.promise().query('SELECT R.id, R.title, R.salary, D.name AS "deparment" FROM roles R LEFT JOIN departments D ON D.id = R.department_id;')
        .then( ([results, fields]) => {
            console.table(results);
        })
        .catch((err) => {
            console.error(err);
        })
        .then( () => {
            init();
        });
}

function updateEmployee() {
    const sql = `SELECT CONCAT(first_name," ",last_name) AS fullname FROM employees;SELECT title FROM roles`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        }

        inquirer
            .prompt([
                {
                    type: 'list',
                    message: `Which employee's role do you want to update?`,
                    name: 'updatename',
                    choices: function() {
                        let employees = results[0].map(choice => choice.title);
                        return employees;
                    }
                },
                {
                    type: 'list',
                    message: `Which role do you want to assign the selected employee?`,
                    name: 'updaterole',
                    choices: function() {
                        let roles = results[1].map(choice => choice.fullname);
                        return roles;
                    }
                }
            ])
            .then((res) => {
                call.updateEmployee(res);
                console.log(`Successfully updated ${res.updatename}'s role`);
            })
            .catch((err) => {
                console.error(err);
            })
            .then( () => {
                init();
            });
    })
}

function addEmployee() {
    const sql = `SELECT title FROM roles;SELECT CONCAT(first_name," ",last_name) AS fullname FROM employees`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        }

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `What is the employee's first name?`,
                    name: 'firstname'
                },
                {
                    type: 'input',
                    message: `What is the employee's last name?`,
                    name: 'lastname'
                },
                {
                    type: 'list',
                    message: `What is the employee's role?`,
                    name: 'employeerole',
                    choices: function() {
                        let roles = results[0].map(choice => choice.title);
                        return roles;
                    }
                },
                {
                    type: 'list',
                    message: `Who is the employee's manager?`,
                    name: 'employeemanager',
                    choices: function() {
                        let employees = results[1].map(choice => choice.fullname);
                        return employees;
                    }
                }
            ])
            .then((res) => {
                call.addEmployee(res);
                console.log(`Successfully added ${res.firstname} ${res.lastname}`);
            })
            .catch((err) => {
                console.error(err);
            })
            .then( () => {
                init();
            });
    })
}

function viewEmployees() {
    db.promise().query(`SELECT E.id, E.first_name, E.last_name, R.title, R.salary, D.name AS "department" FROM employees E LEFT JOIN roles R ON R.id = E.role_id LEFT JOIN departments D ON D.id = R.department_id;`)
        .then( ([results, fields]) => {
            console.table(results);
        })
        .catch((err) => {
            console.error(err);
        })
        .then( () => {
            init();
        });
}

function init() {
    const choices = ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'];

    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: choices,
                name: 'choice'
            }
        ])
        .then((res) => {
            switch(res.choice) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Quit':
                    console.log('Goodbye!');
                    process.exit();
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

init();