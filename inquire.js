const inquirer = require('inquirer');
const Queries = require('./queries.js');

const choices = ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Department', 'Add Department', 'Quit'];
const perform = new Queries;

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
                break;
            case 'Update Employee Role':
                break;
            case 'View All Roles':
                perform.viewRoles();
                break;
            case 'Add Role':
                break;
            case 'View All Department':
                process.viewDepartments();
                break;
            case 'Add Department':
                break;
            case 'Quit':
                console.log('Goodbye!');
                process.exit();
        }
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = inquirer;