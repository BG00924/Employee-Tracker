const { response } = require('express');
const inquirer = require('inquirer');
const actionChoice = require('./actionChoice')

const addDeptQuestions = [
    {
        type: 'input',
        name: 'addDepartment',
        message: "What is the name of the Department you would like to add?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please input a Department Name.');
                return false;
            }
        }
    }
];


// displays departments
viewDepartments = () => {
    connection.query(`
    SELECT
        id AS ID, 
        dept AS "Department Name"  
        FROM departments
        `, function (err, res) {
        if (err) throw err;
        console.table(res);
        actionChoice();
    });
};

// function to add a department
addDepartment = () => {
    return inquirer.prompt(addDeptQuestions)
    .then(data => {
        connection.query(`
        INSERT INTO departments (dept)
        VALUES
            ('${data.addDepartment}')`, 
        function (err, res) {
            if (err) throw err;
            console.log("Department Successfully Added!");
            actionChoice();
        });
    });  
};

module.exports = {
    viewDepartments,
    addDepartment
}