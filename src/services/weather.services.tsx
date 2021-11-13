const WeatherService = {

    getWeatherData: function (city:string) {
        return fetch(`http://api.weatherapi.com/v1/forecast.json?key=24258f8832a940d4839184700210711&q=${city}&days=10&aqi=no&alerts=no`, { 
            method: 'get', 
            headers: new Headers({
                'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': '*',
              'Host':'http://api.weatherapi.com'
            }), 
          })
    }


}


export default WeatherService;