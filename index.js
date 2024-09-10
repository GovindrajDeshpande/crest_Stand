var connection = require('./connection');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejsl')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/appointment.html');
});

app.post('/', function (req, res) {
    var name = req.body.name;
    var mno = req.body.mno;
    var doctorname = req.body.doctorname;
    var date = req.body.date;

    connection.connect(function (error) {
        if (error) throw error;

        var sqlI = "insert into appointment(name, mno, doctorname, date) values('" + name + "', '" + mno + "', '" + doctorname + "', '" + date + "')";
        connection.query(sqlI, function (error, result) {
            if (error) throw error;

            res.send('Your Appointment bookid Successfully' + result.insertId);
        });
    });
});

app.get('/appointmentList.ejs', function (req, res) {
    connection.connect(function (error) {
        if (error) console.log(error);

        var sqlS = "select * from appointment";
        connection.query(sqlS, function (error, result) {
            if (error) console.log(error);
            res.render(__dirname + "/appointmentList.ejs", { appointmentList: result });
        });
    });
});

app.listen(2000);