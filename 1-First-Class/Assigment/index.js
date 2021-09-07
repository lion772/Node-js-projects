const http = require("http");
const { requestHandler } = require("./router");

http.createServer(requestHandler).listen(8080, console.log("You can do it!"));
