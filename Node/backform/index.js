const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const port = 8000;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "formlesson",
});

connection.connect((err) =>{
    if(err) throw err;
    console.log("Connecté à la base de données Mysql")
})
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next();
});

app.post("/addUser", (req, res) =>{
    console.log(req.body);
    const { username, email, password, techno, gender, hobbies } = req.body
    const sqlInsert = "INSERT INTO users (username, email, password, techno, gender) VALUES (?, ?, ?, ?, ?)";
    const values = [username, email, password, techno, gender];
    connection.query(sqlInsert, values, (err, result) =>{
        if (err) throw err;
        console.log(result);
        let userFromBack = req.body;
        userFromBack.id = result.insertId;
        hobbies.map((e) =>{
            const { hobby, niveau, idUtilisateur} = req.body;
            const sqlInsert = "INSERT INTO `hobbies`(`hobby`, `niveau`, `idUtilisateur`) VALUES (?, ?, ?)";
            const values = [e.value, e.level, userFromBack.id];
            connection.query(sqlInsert, values, (err, result) =>{
                if (err) throw err;
            });
        });
        res.status(200).json(userFromBack);
    });
});

app.post("/addHobbies", (req, res) =>{
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Serveur node écoutant sur le port ${port}`);
});
