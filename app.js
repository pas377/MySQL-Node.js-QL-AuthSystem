const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config(({ path: './.env'}));

const app = express();

const db = mysql.createConnection({
    // When live put IP adress in .env as host:
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    //may need to enter my password at some pont:
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent as HTML forms)
app.use(express.urlencoded({ extended: false}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL Connected...")
    }
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("Server started on Port 5000")
})