const http = require("http");
const { requestHandler } = require("./router");
http.createServer(requestHandler).listen(8080);
