const express = require("express");

const app = express();

app.get("/", function (req, res) {
    //First argument we are targeting the home route (homepage)
    //console.log(req);
    res.send("<h1>Hello</h1>");
});

app.get("/contact", function (req, res) {
    res.send("<p>Contact me at: william.steinkedemello@gmail.com</p>");
});

app.get("/about", function (req, res) {
    res.send(
        "<p>My name is William Steinke de Mello and I'm 27 years old. I'm actually a geologist, but keen on programming and create new applications! </p>"
    );
});

app.listen(3000, function () {
    console.log("server started on port 3000");
});
