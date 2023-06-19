require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT,
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  //let altersql = `ALTER USER '${DB_USER}'@'${DB_HOST}' IDENTIFIED WITH mysql_native_password BY '${DB_PASS}';`;
  let sql = fs.readFileSync(__dirname + "/init_db.sql").toString();

  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation was successful!");

    console.log("Closing...");
  });

  con.end();
});
