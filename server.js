const inquirer = require('inquirer');
const Queries = require('./queries.js');

const choices = ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Department', 'Add Department', 'Quit'];
const perform = new Queries;

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
                    perform.viewEmployees();
                    break;
                case 'Add Employee':
                    perform.addEmployee();
                    break;
                case 'Update Employee Role':
                    perform.updateEmployee();
                    break;
                case 'View All Roles':
                    perform.viewRoles();
                    break;
                case 'Add Role':
                    perform.addRole();
                    break;
                case 'View All Department':
                    perform.viewDepartments();
                    break;
                case 'Add Department':
                    perform.addDepartment();
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