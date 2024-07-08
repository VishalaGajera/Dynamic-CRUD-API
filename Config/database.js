const mysql = require("mysql");

/********** mysql connection *********/
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:'mydb'
})

con.connect((err) => {
    if (err) throw err;
    // const sql = "CREATE DATABASE mydb";
    // con.query(sql, (err, result) => {
    //     if (err) throw err;
    //     console.log("Database Created Successfully...:\n", result);
    // })

    const createTable='CREATE TABLE user (id int auto_increment primary key, name varchar(255), firstname varchar(255), lastname varchar(255), email varchar(255),country varchar(255), state varchar(255), city varchar(255))';
    con.query(createTable,(err,result)=>{
        if(err) throw err;
        console.log("User Table Created Successfully...");
    })
})
