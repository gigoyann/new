const express = require("express");
const logInController = require("../controllers/logInController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
// log
router.post('/', logInController.logIn);  
// reg
router.post('/reg', logInController.reg);

router.get('/profile',authMiddleware, (req,res) =>{
    res.json({messege:'YOU CAN',user: req.user})
})

module.exports = router