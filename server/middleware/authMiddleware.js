require('dotenv').config;

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status('400').json({messege:'no token'})
    }

    try{
        const decoded = jwt.verify(token,SECRET_KEY)
        req.user = decoded
        next()
    }
    catch(error){
        return res.status('400').json({messege:'wrong token token'})
    }
}

module.exports = authMiddleware