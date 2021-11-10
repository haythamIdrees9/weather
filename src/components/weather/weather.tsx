import { useEffect, useState } from "react"
import WeatherService from "../../services/weather.services";
import Select from "../custom/select/searchable-select";
import "./weather.scss"
import Card from "../custom/card/card";
function Weather() {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let   [loading, setLoading] = useState(false);
    const [flipCard, setFlipCard] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [currentCity, setCurrentCity] = useState<string>("");
    const cities = ["Paris", "Landon", "Athens", "Amsterdam", "Bratislava", "Brussels", "Bucharest"];
    useEffect(() => {
        getWeatherData(cities[0]);
    }, [])

    function onChange(e: string) {
        getWeatherData(e);
    }
    function getWeatherData(city: string) {
        if (currentCity === city) {
            return;
        }
        setCurrentCity(city)
        setLoading(true);
        WeatherService.getWeatherData(city).then(res => res.json())
            .then(
                onGetData,
                (error) => {
                    setIsLoaded(true);
                    setError(error)
                })
    }

    function onGetData(result: any) {
        if (Array.isArray(result?.forecast?.forecastday)) {
            for (const item of result.forecast.forecastday) {
                item.day.maxtemp_c = Math.round(item.day.maxtemp_c);
                item.day.mintemp_c = Math.round(item.day.mintemp_c);
            }
        }
        setFlipCard(true);
        setLoading(false);
        setTimeout(() => {
            setItems(result)
        }, 400)
        setTimeout(() => {
            setFlipCard(false);
        }, 400)
        setIsLoaded(true);
    }


    let weatherUI = <div></div>;

    if (error) {
        weatherUI = <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        weatherUI = <div>Loading...</div>
    } else if (items?.forecast?.forecastday) {

        weatherUI =
            <div className="container  f-col a-center">
                <div key={items.location.name} className="current-degree">
                    <div className="data">
                        {(items.current && !loading) ? 'current degree ' + items.current.temp_c : ' '} <sup>{(items.current && !loading) ? 'c' : ''} </sup>
                    </div>
                </div>
                <div className="options f-row j-between a-center">
                    <Select placeholder="Select country..." noOptionMessage="Sorry there is no matched City!!" height={40} width={264} options={cities} selectedIndex={0} onChange={(e) => { onChange(e) }} />
                    <div className="select-day">
                        {/* select your country */}
                    </div>
                </div>

                <div className="cards f-row j-between">

                    <div className={(loading ? 'loading f-col j-center a-center' : 'loaded') + (flipCard ? ' flip-card' : '')}>
                        <img src="/loading-sun.png" className="loading-sun"></img>
                        loading...
                    </div>
                    <Card class={flipCard ? 'flip-card' : ''} day="Sunday" date={items.forecast.forecastday[0].date} morningDegree={items.forecast.forecastday[0].day.maxtemp_c} EveningDegree={items.forecast.forecastday[0].day.mintemp_c} summery="cloudy" />
                    <Card class={flipCard ? 'flip-card' : ''} day="Sunday" date={items.forecast.forecastday[1].date} morningDegree={items.forecast.forecastday[1].day.maxtemp_c} EveningDegree={items.forecast.forecastday[1].day.mintemp_c} summery="cloudy" />
                    <Card class={flipCard ? 'flip-card' : ''} day="Sunday" date={items.forecast.forecastday[2].date} morningDegree={items.forecast.forecastday[2].day.maxtemp_c} EveningDegree={items.forecast.forecastday[2].day.mintemp_c} summery="cloudy" />
                    <Card class={flipCard ? 'flip-card' : ''} day="Sunday" date="20/11/2021" morningDegree={20} EveningDegree={10} summery="cloudy" />
                    <Card class={flipCard ? 'flip-card' : ''} day="Sunday" date="20/11/2021" morningDegree={20} EveningDegree={10} summery="cloudy" />

                    <div className="subscription-card-container">
                        <div >
                            <img src="/eye.svg" alt="" />

                            subscribe now and get 14 days of forecasting
                        </div>
                    </div>

                </div>

            </div>
    }

    return weatherUI;

}

export default Weather;