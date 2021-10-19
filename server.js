const inquirer = require('inquirer');
const Queries = require('./queries.js');

const choices = ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Department', 'Add Department', 'Quit'];
const query = new Queries;

function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentname'
        }
    ])
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
                type: 'input',
                message: 'Which department does the role belong to?',
                name: 'roledepartment'
            }
        ])
        .then((res) => {
            query.addRole(res);
        })
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: `Which employee's role do you want to update?`,
                name: 'updatename',
                choices: ``
            },
            {
                type: 'list',
                message: `Which role do you want to assign the selected employee?`,
                name: 'updaterole',
                choices: ``
            }
        ])
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
            choices: ``
        },
        {
            type: 'list',
            message: `Who is the employee's manager?`,
            name: 'employeemanager',
            choices: ``
        }
    ])
}

function init() {
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
                    query.viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    query.viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Department':
                    query.viewDepartments();
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