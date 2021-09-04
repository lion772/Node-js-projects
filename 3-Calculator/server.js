const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html"); //__dirname gives you the whole path file where your document is currently located
});

app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);
    let sum = weight * height;
    res.send(String(sum));
});

app.post("/", function (req, res) {
    //Type in your bash: npm install body-parser
    n1 = Number(req.body.num1);
    n2 = Number(req.body.num2);
    let sum = n1 + n2;
    res.send(String(sum)); //this method just accepts to send STRINGS!
});

app.listen(3000, function () {
    console.log("listening at the port 3000");
});
