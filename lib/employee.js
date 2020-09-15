const { response } = require('express');
const inquirer = require('inquirer');
const actionChoice = require('./actionChoice')

viewEmployees = () => {
    connection.query(`
    SELECT 
        employee.id AS ID, 
        employee.first_name AS FirstName, 
        employee.last_name AS LastName,
        job.title AS Role, 
        job.salary AS Salary, 
        departments.dept AS Department,
        manager.last_name AS Manager
        FROM employee
    LEFT JOIN eRole 
        ON eRole.id = employee.role_id   
    INNER JOIN department 
        ON department.id = job.department_id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    ORDER BY employee.id ASC`,
    function (err, res) {
        if (err) throw err;
        console.table(res);
        actionChoice();
    });
};

addEmployee = () => {
    connection.query("SELECT * FROM employee", function (err, employees) {
        if(err) throw err;
        connection.query("SELECT * FROM job", function (err, roles) {
            if(err) throw err;

            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'addEmployeeFirst',
                    message: "What is the first name?",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log('Please input name.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'addEmployeeLast',
                    message: "What is the last name?",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log('Please input name.');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'addEmployeeRole',
                    message: "What is their role?",
                    // loops roles
                    choices: function() {
                        let choiceArr = [];
                        for (let i=0; i < roles.length; i++) {
                            choiceArr.push(roles[i].title)
                        }
                        return choiceArr;
                    }
                },
                {
                    type: 'list',
                    name: 'addEmployeeManager',
                    message: "Who is the employee's manager?",
                    // list current employees
                    choices: function() {
                        let choiceArr = [];
                        for (let i=0; i < employees.length; i++) {
                            choiceArr.push(employees[i].last_name)
                        }
                        return choiceArr;
                    }
                }
            ])
            .then(data => {

                // assigns values to answers from above
                for (let i = 0; i < roles.length; i++) {
                    if(roles[i].title === data.addEmployeeRole) {
                        data.role_id = roles[i].id;
                    }
                }

                for (let i = 0; i < employees.length; i++) {
                    if(employees[i].last_name === data.addEmployeeManager) {
                        data.manager_id = employees[i].id;
                    }
                }

                connection.query(`
                INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES
                    ('${data.addEmployeeFirst}', '${data.addEmployeeLast}', ${data.role_id}, ${data.manager_id})`, 
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee Successfully Added!");
                    actionChoice();
                });
            });
        });
    });
};

// updates employee
updateEmployeeRole = () => {
    connection.query("SELECT * FROM employee", function (err, employees) {
        if(err) throw err;
        connection.query("SELECT * FROM job", function (err, roles) {
            if(err) throw err;

            // asks who and what to update
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'updateEmployee',
                    message: "Which employee do you want to update?",
                    // This code displays all current employees
                    choices: function() {
                        let choiceArr = [];
                        for (let i=0; i < employees.length; i++) {
                            choiceArr.push(`${employees[i].first_name} ${employees[i].last_name}`)
                        }
                        return choiceArr;
                    }
                },
                {
                    type: 'list',
                    name: 'updateNewRole',
                    message: "What is the new role?",
                    // This code inputs the current roles as choices
                    choices: function() {
                        let choiceArr = [];
                        for (let i=0; i < roles.length; i++) {
                            choiceArr.push(roles[i].title)
                        }
                        return choiceArr;
                    }
                }
            ])
            .then(data => {

                // Loops to assign values to the choices above to be used below
                for (let i = 0; i < employees.length; i++) {
                    if(`${employees[i].first_name} ${employees[i].last_name}` === data.updateEmployee) {
                        data.id = employees[i].id;
                    }
                }

                for (let i = 0; i < roles.length; i++) {
                    if(roles[i].title === data.updateNewRole) {
                        data.role_id = roles[i].id;
                    }
                }

                connection.query(`
                    UPDATE employee
                    SET employee.role_id = ${data.role_id}
                    WHERE employee.id = ${data.id}`, 
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee Successfully Updated!");
                    actionChoice();
                });
            });
        })
    })
};

module.exports = {
    viewEmployees,
    addEmployee,
    updateEmployeeRole
}