const fs = require("fs");

module.exports.requestHandler = function (request, response) {
    const { url, method } = request;

    if (url === "/") {
        response.write(
            `<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`
        );
        return response.end();
    }

    if (url === "/message" && method === "POST") {
        //The data event will be fired whenever a new chunk is ready
        const body = [];
        request.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return request.on("end", () => {
            /* To work with all these chunks, we need to buffer them in order to interact with them. */
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt", message, (err) => {
                if (err) console.log(err);
                response.statusCode = 302;
                response.setHeader("Location", "/");
                return response.end();
            });
        });
    }

    response.setHeader("Content-Type", "text/html");
    response.write(`
                        <html>
                            <head>
                                <title>Hello Node!</title>
                            </head>
                            <body>
                                <h1>Hello node!</h1>
                            </body>
                        </html>               
                `);
    response.end();
};
