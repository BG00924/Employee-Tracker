const { response } = require('express');
const inquirer = require('inquirer');
const actionChoice = require('./actionChoice')

// displays roles
viewRoles = () => {
    connection.query(`
    SELECT 
        job.id AS ID, 
        title AS "Employee Role", 
        job.salary as Salary, 
        department_id AS "Dept #", 
        dept AS "Department" 
        FROM job
    LEFT JOIN department
    ON job.department_id = department.id
    `, function (err, res) {
        if (err) throw err;
        console.table(res);
        actionChoice();
    });
};

// adds role
addRole = () => {
    connection.query("SELECT * FROM departments", function (err, departments) {
        if(err) throw err;

        // questions for details about new role
        return inquirer.prompt([
            {
                type: 'input',
                name: 'addRole',
                message: "What role do you want to add?",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please input role.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addSalary',
                message: "What is the Salary?",
                validate: input => {
                    if (input > 0) {
                        return true;
                    } else {
                        console.log('Please salary.');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'addDept',
                message: "What Department is this role for?",
                // displays departments
                choices: function() {
                    let choiceArr = [];
                    for (let i=0; i < departments.length; i++) {
                        choiceArr.push(departments[i].dept)
                    }
                    return choiceArr;
                }
            }
        ])
        .then(data => {

            // adds value to departments
            for (let i = 0; i < departments.length; i++) {
                if(departments[i].deptName === data.addRoleDept) {
                    data.department_id = departments[i].id;
                }
            }

            connection.query(`
            INSERT INTO job (title, salary, department_id)
            VALUES
                ('${data.addRole}', '${data.addSalary}', ${data.department_id})`, 
            function (err, res) {
                if (err) throw err;
                console.log("Role Added!");
                taskChoice();
            });
        });   
    });
};

module.exports = {
    viewRoles,
    addRole
}