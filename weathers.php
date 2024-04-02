<?php
// Select weather data for given parameters
// Connect to database
$mysqli = new mysqli("localhost","root","Aeronautics@12","WeatherApp");
if ($mysqli -> connect_errno) {
echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
exit();
}

$sql = "SELECT *
FROM weather where
weather_when >= DATE_SUB(NOW(), INTERVAL 3600 SECOND)
ORDER BY weather_when DESC limit 1";
$result = $mysqli -> query($sql);
// If 0 record found
if ($result->num_rows == 0) {
$url = "https://api.openweathermap.org/data/2.5/weather?q=San%20Jose&units=metric&appid=8b99f71711f9f2a8e5fe03f4ce4ce3b7";
// Get data from openweathermap and store in JSON object
$data = file_get_contents($url);
$json = json_decode($data, true);
// Fetch required fields
$weather_description = $json['weather'][0]['description'];
$weather_temperature = $json['main']['temp'];
$weather_wind = $json['wind']['speed'];
$city = $json['name'];
$pressure=$json['main']['pressure'];
$humidity=$json['main']['humidity'];
// Build INSERT SQL statement
$sql = "INSERT INTO weather (weather_description, weather_temperature, weather_wind, city, pressure , humidity)
VALUES('{$weather_description}', {$weather_temperature}, {$weather_wind}, '{$city}',{$pressure},{$humidity})";
// Run SQL statement and report errors
if (!$mysqli -> query($sql)) {
echo("<h1>SQL ERROR: " . $mysqli -> error . "</h1>");

}
}
?>