// Check browser cache first, use if there and less than 10 seconds old
if(localStorage.when != null
    && parseInt(localStorage.when) + 100000 > Date.now()) {
    let freshness = Math.round((Date.now() - localStorage.when)/1000) + " second(s)";
    console.log(freshness);
    var result = `
    <h6 style="text-align:right;">last updated time:${freshness}</h6>
    <h1> ${localStorage.mycity}</h1>
    <h2>Main Weather Condition = ${localStorage.myWeather}</h2>
    <h3>Pressure= ${localStorage.mypressure}hpa</h3>
    <h3> Humidity=${localStorage.myhumidity}%</h3>
    <h3>Temperature = ${localStorage.myTemperature} °C</h3>
    <h3>Wind Speed  = ${localStorage.mywind} m/s </h3>
    `
    //selecting the ID "result" created in the html page and assigning the data which is in result to the id "result".

    document.getElementById("result").innerHTML =result;
    // No local cache, access network
    } else {
    // Fetch weather data from API for given city
    fetch('http://localhost:8003/')
    // Convert response string to json object
    .then(response => response.json())
    .then(response => {
    // Copy one element of response to our HTML paragraph

    // Save new data to browser, with new timestamp
    localStorage.myWeather = response.weather_description;
    localStorage.myTemperature = response.weather_temperature ;
    localStorage.mycity=response.city;
    localStorage.mypressure=response.pressure;
    localStorage.mywind=response.weather_wind;
    localStorage.myhumidity=response.humidity;
    localStorage.when = Date.now(); // milliseconds since January 1 1970
    })
    .catch(err => {
    // Display errors in console
    console.log(err);
    });
    }
  