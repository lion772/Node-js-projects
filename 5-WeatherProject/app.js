const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Listening at the port 3000");
});

app.post("/", function (req, res) {
    const city = req.body.cityName;
    makeRequest(res, city);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

function makeRequest(res, city) {
    const appid = "996a7296bcf2ca021d3a0012b9cdc664";
    const units = "metric";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=${units}`;
    https
        .get(URL, (response) => {
            console.log(
                "Status code: ",
                response.statusCode,
                "Headers :",
                response.headers
            );

            if (response.statusCode === 200) {
                response.on("data", (data) => {
                    //The returned data is a Buffer, so we need to convert it to a JS object
                    const weatherData = JSON.parse(data);
                    const {
                        main: { temp = 0 },
                    } = weatherData;
                    const icon = weatherData.weather[0].icon;
                    const desc = weatherData.weather[0].description;
                    const img = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    const weatherReport = `
                <h1>The temperature in ${city}:</h1>
                <p>The temperature out of the board is ${temp} degrees</p>
                <p><b>And it maybe ${desc}</b></p>
                <img src="${img}" alt="${desc}">
                `;
                    //res.write() I could also include many write methods to display each element of the object, and sending all at once.
                    res.send(weatherReport);

                    //This statement also converts it to a JS object, but the format returned is pretty
                    // similar to a raw json format
                    //process.stdout.write(data);
                });
            } else {
                res.send(`No country with the name ${city} has been found`);
            }
        })
        .on("error", (e) => {
            console.log(e);
        });
}
