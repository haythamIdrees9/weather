const WeatherService = {

    getWeatherData: function () {
        return fetch('https://api.weatherapi.com/v1/current.json?key=24258f8832a940d4839184700210711&q=London&aqi=no')
    }

}


export default WeatherService;