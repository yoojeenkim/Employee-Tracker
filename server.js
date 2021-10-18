const inquirer = require('inquirer');
const express = require('express');
const Queries = require('./queries.js');

const PORT = process.env.PORT || 3001;
const app = express();

const choices = ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Department', 'Add Department', 'Quit'];
const perform = new Queries();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function inquire() {
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
}

// function init() {

// }

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// init();
inquire();