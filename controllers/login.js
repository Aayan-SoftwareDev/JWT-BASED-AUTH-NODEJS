const jwt = require("jsonwebtoken");
const {user} = require("../model/login");
const bcrypt = require("bcrypt");

async function controllerlogin(req, res){
    if(!req.body.username || !req.body.password) res.status(400).json({message: "Bad Request"});

    const {username, password} = req.body;
    const findUser = await user.findOne({username});
    if(!findUser) res.status(404).json({message: "User Not Found"});
    const isPassCorrect = await bcrypt.compare(password, findUser.password);
    if(!isPassCorrect) res.status(401).json({message: "Password Not Correct"});

    const token = jwt.sign({username:username}, "secret_key", {expiresIn: "1h"});
    res.cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
    });

    res.status(200).json({auth: true});
}

module.exports = {controllerlogin};