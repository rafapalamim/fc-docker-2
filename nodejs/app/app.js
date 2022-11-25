const express = require('express')
const app = express()
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'fc'
});


conn.connect();

app.get('/', function (request, result) {
    conn.query("SHOW DATABASES;", (err, results) => {

        var html = '';
        results.map((row) => {
            html += row.Database + ' | ';
        })

        result.send(html);
    })
})
app.listen(3000, "0.0.0.0", function () {
    console.log('hello world app is listening on port 3000')
})