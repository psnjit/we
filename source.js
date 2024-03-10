const APIKEY= '96e192aa52346eb73e476fe9d279350e';
const WEATHERAPIPATH= '//api.openweathermap.org/data/2.5/weather?q=';
let cityValue= '';

function getWeatherData(city) {
    const fullApiPath= `${WEATHERAPIPATH}${city}&appid=${APIKEY}`;
    console.log(fullApiPath);
    hideError();
    // Make a GET request
    fetch(fullApiPath)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const result= getValue(data);
        console.log(result);
        setValue(result);
        showWeather();
    })
    .catch(error => {
        console.error('Error:', error);
        showError();
    });
}

function searchButtonHandler() {
    console.log('search started');
    getWeatherData(cityValue);
}

function cityChangeHandler (e) {
    const city= e.target.value;
    console.log(city);
    cityValue=city;
    console.log(cityValue);
}

function getValue(data) {
    let result={};
    result.temp=data.main.temp;
    result.humidity=data.main.humidity;
    result.windSpeed=data.wind.speed;
    return result;
}

function setValue(values) {
    const city=document.getElementById("city");
    city.textContent=cityValue;
    const temp=document.getElementById("temp");
    const humidity=document.getElementById("humidity");
    const windSpeed= document.getElementById("windSpeed");
    temp.textContent=`${((values.temp-273.15).toString()).slice(0,4)}°C`;
    humidity.textContent=`${values.humidity}%`;
    console.log(typeof values.windSpeed);
    console.log(values.windSpeed*3.6);
    windSpeed.textContent=`${((values.windSpeed*3.6).toString()).slice(0,3)}km/hr`;
}

function showWeather() {
    const weather= document.getElementById("weather");
    weather.classList.remove("hide");
}

function hideWeather() {
    const weather= document.getElementById("weather");
    weather.classList.add("hide");
}

function showSpinner() {
    const weather= document.getElementById("spinner");
    weather.classList.remove("hide");
}

function hideSpinner() {
    const weather= document.getElementById("spinner");
    weather.classList.add("hide");
}

function showError() {
    const error= document.getElementById("error");
    error.classList.remove("hide");
}

function hideError() {
    const error= document.getElementById("error");
    error.classList.add("hide");
}