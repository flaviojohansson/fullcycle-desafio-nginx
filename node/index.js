const express = require('express')
const mysql = require('mysql')
const util = require('util')
const random_name = require('node-random-name');

const app = express()
const port = 3000

const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'desafiodb'
};

const connection = mysql.createConnection(config)
const query = util.promisify(connection.query).bind(connection);
// connection.end()

app.get('/', async (req, res) => {

    const name = random_name()

    const insert = `INSERT INTO people(name) values('${name}')`
    const select = `SELECT name FROM people`

    // Insere primeiro
    await query(insert)

    // Monta o retorno
    // Conheço muito pouco de nodeJs

    html = '<h1>Full Cycle</h1><ul>'

    let rows = await query(select)

    for (let i=0; i < rows.length; i++) {
        html += "<li>" + rows[i].name + "</li>"
    }
    
    html += '</ul>'

    res.send(html)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})