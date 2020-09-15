const { response } = require('express');
const inquirer = require('inquirer');
const employeeFunctions = require('./employee');
const roleFunctions = require('./role')
const deptFunctions = require('./dept')

const actionQuestion = [
    {
        type: 'list',
        name: 'actionChoice',
        message: 'What action would you like to complete?',
        choices: [
            'View Employees', 
            'View Roles', 
            'View Departments',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'Quit'
        ]
    }
];

actionChoice = () => {
    return inquirer.prompt(actionQuestion)
    .then(choice => {
        if (choice.actionChoice === "View Employees") {
            employeeFunctions.viewEmployees()
        }
        else if (choice.actionChoice === "View Roles") {
            roleFunctions.viewRoles()
        }
        else if (choice.actionChoice === "View Departments") {
            deptFunctions.viewDepartments()
        }
        else if (choice.actionChoice === "Add Employee") {
            employeeFunctions.addEmployee()
        }
        else if (choice.actionChoice === "Add Role") {
            roleFunctions.addRole()
        }
        else if (choice.actionChoice === "Add Department") {
            deptFunctions.addDepartment()
        }
        else if (choice.actionChoice === "Update Employee Role") {
            employeeFunctions.updateEmployeeRole()
        }
        else if (choice.actionChoice === "Quit") {
            console.log('Application end')
            connection.end()
        }
    })
}

module.exports = actionChoice