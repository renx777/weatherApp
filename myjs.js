$(document).ready(function () {
    var lat, long;

// check if the user browser supports geolocation api,which is necessary to get the latitude and longitude of the place
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
        alert(
            "It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it."
        );
    }

    function successFunction(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log("Your latitude is :" + lat + " and longitude is " + long);

        var ip, url;

        console.log(lat);
        url =
            "https://fcc-weather-api.glitch.me/api/current?lat=" +
            lat +
            "&lon=" +
            long;
        console.log(url);

        // once you get that lat and long of the user,use getJSON method to request api data from the api service here it is fcc-weather-api
        $.getJSON(url, function (datax) {
            var data = datax;
            console.log(data);
            console.log(data.name);
            console.log(data.weather[0].icon);
            console.log(data.main.temp);

        // after getting the necessary data from the api,populate the index.html with requried info
            $("#city").text(data.name);

             $("#icon").prepend("<img src=" + data.weather[0].icon + "></img>");

            $("#t").text(data.main.temp);
            $("#hum").text("Humidity: " + data.main.humidity);
            $("#wind").text("Wind: " + data.wind.speed + " mph");
            $("#vis").text("Visibility: " + data.visibility + " m");

            $("#cel").click(function () {
                $("#t").text(data.main.temp);
            });
            $("#far").click(function () {
                var deg = data.main.temp;
                var far = Math.round((9 / 5 * deg + 32) * 100) / 100;
                $("#t").text(far);
            });
        });
    }

    function errorFunction(position) {
        console.log(position);
    }
});
