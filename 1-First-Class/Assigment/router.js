const fs = require("fs");

module.exports.requestHandler = function (req, res) {
    const { url, method } = req;

    if (method === "GET") {
        if (url === "/") {
            res.write(
                `<html>
                <h1>Greetings!</h1>
                <h3>Type a username on the field below</h3>
                <body><form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Send</button></form></body>
                </html>`
            );
            return res.end();
        } else if (url === "/users") {
            res.write(
                `<ul>
                    <li>user 1</li>
                    <li>user 2</li>
                    <li>user 3</li>
                    <li>user 4</li>
                </ul>`
            );
            return res.end();
        }
    } else if (method === "POST") {
        if (url === "/create-user") {
            const body = [];
            req.on("data", (chunk) => body.push(chunk));
            req.on("end", () => {
                const parsedBody = Buffer.concat(body).toString();
                console.log(parsedBody);
                const message = parsedBody.split("=")[1];
                fs.writeFile("user.txt", message, (err) => {
                    if (err) console.log(err);
                    res.statusCode = 302;
                    res.setHeader("Location", "/");
                    return res.end();
                });
            });
        }
    } else {
        console.log("ops...");
        res.setHeader("content-type", "text/html");
        res.statusCode = 404;
        res.write(`<h1>Page not found :( </h1>`);
        return res.end();
    }
};
