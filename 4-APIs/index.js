console.log($);
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather",
    data: {
        q: "Rio",
        appid: "996a7296bcf2ca021d3a0012b9cdc664",
        units: "metric",
    },
    success(data) {
        treatData(data);
    },
});

function treatData(data) {
    console.log(data);
}
