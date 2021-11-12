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
    const [hourlyData, setHourlyData] = useState<any>(<span></span>);

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
        setFlipCards(true)
        setTimeout(() => {
            setHourlyDisplay(index)
            setFlipCards(false)
            setHourlyData(setHourlyDataValue(index));
        }, 400)

    }

    function switchToDailyData() {
        onDaySelect(-1);
    }

    function setHourlyDataValue(index: number) {
        if (index >= 3) {
            index = 0;// I don't get the 5 days data because I need to pay first
        }
        if (index >= 0) {
            let keyIndex = 0;
            return (

                items.forecast.forecastday[index].hour.map((hour: any) =>

                    <div className="f-row j-between hour-data" key={keyIndex++}>
                        <div className="time py-19px">
                            {getTimeFormatted(new Date(hour?.time).getHours() + 1)}
                        </div>
                        <div className="weather-img">
                            <img src={hour.condition.icon} alt="" />
                        </div>
                        <div className="py-19px temp">
                            <span>{hour.temp_c}</span><sup className="ml-1px">o</sup>
                        </div>
                        <div className="py-19px real-feel-container">
                            <span className="real-feel">
                                RealFeel
                            </span>
                            {hour.dewpoint_c}
                        </div>
                    </div>
                )
            )
        } else {
            return <div>no data</div>
        }
    }

    function getTimeFormatted(time: number) {
        if (time > 12) {
            return `${time - 12} pm`
        } else {
            return `${time} am`
        }
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

                <div className="w-100p f-row j-center">
                    <CardData hourlyData={hourlyData} dayHourlyIndex={dayHourlyIndex} loading={loading} flipCard={flipCard} flipCards={flipCards} items={items} onDaySelect={(index) => onDaySelect(index)} switchToDailyData={switchToDailyData} />
                </div>

            </div>
    }

    return weatherUI;

}

export default Weather;