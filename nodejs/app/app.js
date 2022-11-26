const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mysql = require('mysql2');

var conn = null;

function dbConnect() {
    conn = mysql.createConnection({
        host: 'db',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'fc'
    });

    conn.connect();
}

app.get('/', function (request, response) {
    dbConnect();
    conn.query("SELECT id,name FROM fc.person", (err, results) => {

        if(err){
            response.send("Inicializando banco de dados... Aguarde.");
            return;
        }

        var html = '<h1>Full Cycle Rocks!</h1>';
        html += "<h3>Cadastro de nome</h3>";
        html += "<form method='post' action='http://localhost:8080/save'>";
        html += "<input type='text' name='name' placeholder='Informe um nome' />"
        html += "<button type='submit'>Salvar</button>"
        html += "</form>";
        html += "<h3>Lista de nomes</h3>";
        if (results.length <= 0) {
            html += "<p>Nenhum nome cadastrado. Use o campo acima para cadastrar.</p>";
        } else {
            html += "<ul>";
            results.map((row) => {
                html += `<li>ID ${row.id} - ${row.name}</li>`;
            })
            html += "</ul>";
        }
        response.send(html);
    })
})
app.post('/save', function (request, response) {
    dbConnect();
    conn.query(`INSERT INTO fc.person (name) VALUES ('${request.body.name}')`, (err, results) => {
        if(err){
            response.send("Inicializando banco de dados... Aguarde.");
            return;
        }
        response.redirect('http://localhost:8080');
    });
})
app.listen(3000, "0.0.0.0", function () {
    console.log('hello world app is listening on port 3000')
})