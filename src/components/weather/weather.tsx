import { useEffect, useState } from "react"
import WeatherService from "../../services/weather.services";
import Select from "../custom/select/searchable-select";
import "./weather.scss"
import Card from "../custom/card/card";
function Weather() {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [counter, setCounter] = useState<number>(0);
    const cities = ["Paris", "Landon", "Athens", "Amsterdam", "Bratislava", "Brussels", "Bucharest"]
    useEffect(() => {
        getWeatherData(cities[0]);
    }, [])

    function onChange(e: string) {
        getWeatherData(e);
    }
    function getWeatherData(city:string) {

        WeatherService.getWeatherData(city).then(res => res.json())
            .then((result) => {
                if(Array.isArray(result?.forecast?.forecastday)){
                    for (const item of result.forecast.forecastday) {
                        item.day.maxtemp_c = Math.round(item.day.maxtemp_c);
                        item.day.mintemp_c = Math.round(item.day.mintemp_c);
                    }
                }
                setItems(result)
                setIsLoaded(true);
                setCounter(counter + 1);
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error)
                })
    }

    let weathereUI = <span></span>;
    if (error) {
        weathereUI = <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        weathereUI = <div>Loading...</div>
    } else {
        weathereUI =
            <div className="container  f-col a-center">
                <div className="options f-row j-between a-center">
                    <Select placeholder="Select country..." noOptionMessage="Sorry there is no matched country!!" height={40} width={264} options={cities} onChange={(e) => { onChange(e) }} />
                    <div className="select-day">
                        {/* select your country */}
                    </div>
                </div>
                <ul>
                    <div onClick={(e) => getWeatherData(`${e}`)} key={items.location.name}>
                        <div className="name">
                            {items.location.name}:
                        </div>
                        <div className="data">
                            current degree {items.current.temp_c} {counter}
                        </div>
                    </div>
                    <div className="cards f-row j-between">
                        <Card day="Sunday" date={items.forecast.forecastday[0].date} morningDegree={items.forecast.forecastday[0].day.maxtemp_c} EveningDegree={items.forecast.forecastday[0].day.mintemp_c} summery="cloudy" />
                        <Card day="Sunday" date={items.forecast.forecastday[1].date} morningDegree={items.forecast.forecastday[1].day.maxtemp_c} EveningDegree={items.forecast.forecastday[1].day.mintemp_c} summery="cloudy" />
                        <Card day="Sunday" date={items.forecast.forecastday[2].date} morningDegree={items.forecast.forecastday[2].day.maxtemp_c} EveningDegree={items.forecast.forecastday[2].day.mintemp_c} summery="cloudy" />
                        <Card day="Sunday" date="20/11/2021" morningDegree={20} EveningDegree={10} summery="cloudy" />
                        <Card day="Sunday" date="20/11/2021" morningDegree={20} EveningDegree={10} summery="cloudy" />

                        <div className="subscription-card-container">
                            <div >
                                <img src="/eye.svg" alt="" />

                                subscribe now and get 14 days of forecasting
                            </div>
                        </div>

                    </div>

                </ul>
            </div>
    }

    return weathereUI;

}

export default Weather;