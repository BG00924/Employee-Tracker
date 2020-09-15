const { prompt } = require('inquirer')
const db = require('./db/index')
require('console.table')


function begin() {
    loadMainPrompts()
}

function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View all employees",
                    value: "VIEW_EMPLOYEES"
                }
            ]
        }
    ])
    .then(res => {
        let choice = res.choice;
        switch (choice) {
            case "VIEW_EMPLOYEES": 
                viewEmployees()
                break;
            default:
                // quit();
        }
    })
}

function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows
            console.log("\n")
            console.table(employees)
        })
}


begin();