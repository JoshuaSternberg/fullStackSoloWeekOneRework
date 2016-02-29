var express = require('express');
var router = express.Router();
var path = require('path');

var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/employees';
}

router.get('/', function(req, res) {
    var results = [];

    pg.connect(connectionString, function (err,client, done){
        var query = client.query ('SELECT * FROM employees_info;');

        query.on('row', function (row){
            results.push(row);
        });

        query.on ('end', function () {
            client.end();
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }
    });
});

router.post('/', function(req, res) {

    //var addPerson = {
    //   first_name: req.body.firstName,
    //    last_name: req.body.lastName
    //};

    pg.connect(connectionString, function(err, client, done){
        client.query('INSERT INTO employees_info (emp_first_name, emp_last_name, emp_id, emp_job_title, emp_salary)'
        + ' VALUES($1, $2, $3, $4, $5)',
            [req.body.empFirstName, req.body.empLastName, req.body.empID, req.body.empJobTitle, req.body.empSalary],
            function (err, result) {
                if (err){
                    console.log('error inserting data: ' , err );
                    res.send (false);
                } else {
                    res.send(result);
                }
            });
    });

});






module.exports = router;

