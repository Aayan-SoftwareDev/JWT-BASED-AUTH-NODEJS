const express = require("express");
const {router} = require("./router/login");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

mongoose.connect("CONNECTION_URL")
.then(() => console.log("mongodb connected!"));

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/login', router);

app.use((req, res, next) => {
    const token = req.cookies.token;
    if(!token) res.status(401).redirect('/login').json({message:"Not Auth"});
    jwt.verify(token, "secret_key", (err, user) => {
        if(err) res.status(401).json({message:"Invalid JWT token"});
        req.user = user;
        next();
    });
});

app.get("/", (req, res) => {
    res.end("<h1>This is the main page!</h1>");
});

app.listen(PORT, () => console.log(`App is running at PORT: ${PORT}`));