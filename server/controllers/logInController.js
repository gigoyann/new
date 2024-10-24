const { json } = require('express');
const User = require('../models/usersClass');
const users = require('../models/usersModel');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY

module.exports.logIn = ((req,res)=>{
    const {login, password} = req.body
    let user = users.find(name => name.login == login)

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const token = jwt.sign(
        { id: user.id, login: user.login },  // payload
        SECRET_KEY,                          // секретный ключ
        { expiresIn: '30s' }                  // время жизни токена
    );

    res.json({ token, user });

})

module.exports.reg = ((req,res)=>{
    const {login, password} = req.body
    users.push(new User(login,password));
    res.json(users)
    
})

