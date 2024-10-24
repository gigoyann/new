const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(cors())
const logInRoute = require("./routes/logInRoute");
app.use('/api/user', logInRoute);
module.exports = app;

