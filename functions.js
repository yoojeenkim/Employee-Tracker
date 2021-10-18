const viewDepartments = () => {
    db.promise().query('SELECT * FROM departments')
        .then( ([results, fields]) => {
            console.table(results);
        })
        .catch((err) => {
            console.error(err);
        })
        .then( () => {
            inquire();
        });
}

const viewRoles = () => {
    db.promise().query('SELECT * FROM roles')
        .then( ([results, fields]) => {
            console.table(results);
        })
        .catch((err) => {
            console.error(err);
        })
        .then( () => {
            inquire();
        });  
}

const viewEmployees = () => {
    db.promise().query('SELECT * FROM employees')
        .then( ([results, fields]) => {
            console.table(results);
        })
        .catch((err) => {
            console.error(err);
        })
        .then( () => {
            inquire();
        });
}
