const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// const choices = ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Department', 'Add Department', 'Quit'];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Root123',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database`)
);

// db.query('SELECT * FROM employee', function (err, results) {
//     console.log(results);
// });

db.query('SELECT * FROM roles', function (err, results) {
    console.log(results);
});

db.query('SELECT * FROM departments', function (err, results) {
    console.log(results);
});

// inquirer
//     .prompt([
//         {
//             type: 'list',
//             message: 'What would you like to do?',
//             choices: choices,
//             name: 'list'
//         }
//     ])

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});