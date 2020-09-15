const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name,
             employee.last_name, job.title, departments.name
             AS department, job.salary, CONCAT(manager.first_name,
                 ' ', manager.last_name) AS manager FROM 
                 employee LEFT JOIN job on employee.job_id = 
                 job.id LEFT JOIN departments on job.departments_id 
                 = departments.id LEFT JOIN employee manager on 
                 manager.id = employee.manager_id;`
        )
    }

    updateEmployeeRole(employee_id, job_id) {
        return this.connection.promise().query(
            `UPDATE employee SET job_id = ? WHERE id = ?`, [job_id, employee_id]
        )
    }

    createDepartment(department) {
        return this.connection.promise().query(
            `INSERT INTO departments SET ?`, department
        )
    }
}

module.exports = new DB(connection)