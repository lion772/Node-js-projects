const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];

    if (url === "/") {
        //response.write(JSON.stringify(responseBody));

        response.write(`
                        <html>
                            <head>
                            <title>[YOUR_TITLE]</title>
                            </head>
                            <body>
                                <form action='/message' method='POST'>
                                    <input type='text' name='message' />
                                    <button type='submit'>Send</button>
                                </form>
                            </body>
                        </html>
                `);
        return response.end();
    }

    if (url === "/message" && method === "POST") {
        fs.writeFileSync("message.txt", "Abacate");
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
    }
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

    request
        .on("error", (err) => {
            console.error(err);
        })
        .on("data", (chunk) => {
            body.push(chunk);
        })
        .on("end", () => {
            body = Buffer.concat(body).toString();
            // BEGINNING OF NEW STUFF

            response.on("error", (err) => {
                console.error(err);
            });

            //response.setHeader("Content-Type", "application/json");
            // Note: the 2 lines above could be replaced with this next one:
            // response.writeHead(200, {'Content-Type': 'application/json'})

            const responseBody = { headers, method, url, body };

            // Note: the 2 lines above could be replaced with this next one:
            // response.end(JSON.stringify(responseBody))

            // END OF NEW STUFF
        });
}).listen(8080);
