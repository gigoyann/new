const http = require("http");
const app = require("./app");
require('dotenv').config();

const server = http.createServer(app);

const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
    console.log(`Server run at http://localhost:${PORT}`);
});