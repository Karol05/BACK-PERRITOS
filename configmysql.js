const mysql = require('mysql2');

const config = {
    host : 'localhost',
    user : 'root',
    database: 'guarderiaperritos',
    password: 'root',
    insecureAuth: true,
};

const conn = mysql.createConnection(config);

conn.connect(function(err) {
    if (err) throw err;
    console.log('Conexión a la base de datos exitosa!');
});

module.exports = conn;