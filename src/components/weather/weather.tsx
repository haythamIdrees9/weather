import { useEffect, useState } from "react"
import WeatherService from "../../services/weather.services";
import Select from "../custom/select/searchable-select";
import "./weather.scss"
import CardData from "./card-data/card-data";
function Weather() {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let [loading, setLoading] = useState(false);
    const [flipCard, setFlipCard] = useState(false);
    const [flipCards, setFlipCards] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [currentCity, setCurrentCity] = useState<string>("");
    const [dayHourlyIndex, setHourlyDisplay] = useState<number>(-1);

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

    function onDaySelect(index: number) {
        console.log('index', index);
        setFlipCards(true)
        setTimeout(() => {
            setHourlyDisplay(index)
            setFlipCards(false)
        }, 400)

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
                <div className="options f-row j-center a-center">
                    <Select placeholder="Select country..." noOptionMessage="Sorry there is no matched City!!" height={40} width={264} options={cities} selectedIndex={0} onChange={(e) => { onChange(e) }} />
                </div>

                <div >
                    <CardData dayHourlyIndex={dayHourlyIndex} loading={loading} flipCard={flipCard} flipCards={flipCards} items={items} onDaySelect={(index) => onDaySelect(index)} />
                </div>

            </div>
    }

    return weatherUI;

}

export default Weather;