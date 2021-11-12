const WeatherService = {

    getWeatherData: function (city:string) {
        return fetch(`http://api.weatherapi.com/v1/forecast.json?key=24258f8832a940d4839184700210711&q=${city}&days=10&aqi=no&alerts=no`)
    }


}


export default WeatherService;