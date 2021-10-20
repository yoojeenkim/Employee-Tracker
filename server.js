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
        })
        .catch((err) => {
            console.error(err);
        });
}

function addRole() {
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
                choices: ''
            }
        ])
        .then((res) => {
            call.addRole(res);
        })
        .catch((err) => {
            console.error(err);
        });
}

function updateEmployee() {
    const sql = `SELECT title FROM roles;SELECT CONCAT(first_name," ",last_name) AS fullname FROM employees`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
        }

        console.log(results[0]);
        console.log(results[1]);

        inquirer
            .prompt([
                {
                    type: 'list',
                    message: `Which employee's role do you want to update?`,
                    name: 'updatename',
                    choices: function() {
                        let roles = results[0].map(choice => choice.title);
                        return roles;
                    }
                },
                {
                    type: 'list',
                    message: `Which role do you want to assign the selected employee?`,
                    name: 'updaterole',
                    choices: function() {
                        let employees = results[1].map(choice => choice.full_name);
                        return employees;
                    }
                }
            ])
            .then((res) => {
                call.updateEmployee();
            })
            .catch((err) => {
                console.error(err);
            });
    })
}

function addEmployee() {
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
                choices: ''
            },
            {
                type: 'list',
                message: `Who is the employee's manager?`,
                name: 'employeemanager',
                choices: ''
            }
        ])
        .then((res) => {
            call.addEmployee();
        })
        .catch((err) => {
            console.error(err);
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
                    call.viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    call.viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Department':
                    call.viewDepartments();
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