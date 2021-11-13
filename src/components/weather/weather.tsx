import { useEffect, useState } from "react"
import WeatherService from "../../services/weather.services";
import Select from "../custom/select/searchable-select";
import "./weather.scss"
import CardData from "./card-data/card-data";
import CurrentDayInfo from "./current-day-info/current-day-info";
function Weather() {
    const tabIndicatorValues = [{ width: '50px', left: '-5px' }, { width: '84px', left: '55px' }];
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let [loading, setLoading] = useState(false);
    const [flipCard, setFlipCard] = useState(false);
    const [flipCards, setFlipCards] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [currentCity, setCurrentCity] = useState<string>("");
    const [dayHourlyIndex, setHourlyDisplay] = useState<number>(-1);
    const [hourlyData, setHourlyData] = useState<any>(<span></span>);
    const [isCurrentDayInfo, setIsCurrentDayInfo] = useState<Boolean>(true);
    const [cardsTabIndicatorStyle, setCardsTabIndicatorStyle] = useState<{ width: string, left: string }>(tabIndicatorValues[0]);
    const cities = ['Amsterdam', 'Athens', 'Belgrade', 'Berlin', 'Bern', 'Bratislava', 'Brussels', 'Bucharest', 'Budapest', 'Chisinau',
                    'Copenhagen', 'Dublin', 'Helsinki',"Jerusalem", 'Kiev', 'Landon', 'Lisbon', 'Luxembourg', 'Madrid', 'Minsk', 'Monaco', 'Moscow',
                    'Nicosia', 'Nuuk', 'Oslo', 'Paris', 'Podgorica', 'Prague', 'Reykjavik', 'Riga', 'Rome', 'Sarajevo', 'Skopje', 'Sofia',
                    'Stockholm', 'Tallinn', 'Tirana', 'Vaduz', 'Valletta', 'Vienna', 'Vilnius', 'Warsaw', 'Zagreb'];

    useEffect(() => {
        getWeatherData(cities[13]);
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
            setItems(result);
            if (dayHourlyIndex !== -1) {
                setHourlyData(setHourlyDataValue(dayHourlyIndex));

            }
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
            return <div>no data exit</div>
        }
    }

    function getTimeFormatted(time: number) {
        if (time > 12) {
            return `${time - 12} pm`
        } else {
            return `${time} am`
        }
    }

    /**
     * switch between daily information or forecasting
     */
    function setDisplayType(value: boolean) {
        if (value === isCurrentDayInfo) {
            return;
        }
        setFlipCards(true);
        let tabIndicatorValuesIndex = (value) ? 0 : 1;
        setCardsTabIndicatorStyle(tabIndicatorValues[tabIndicatorValuesIndex])
        setTimeout(() => {
            setIsCurrentDayInfo(value)
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
                <div className="options f-row j-center a-center">
                    <Select placeholder="Select country..." noOptionMessage="Sorry there is no matched City!!" height={40} width={264} options={cities} selectedIndex={13} onChange={(e) => { onChange(e) }} />
                </div>

                <div className="tabs-container f-row  j-center" style={{ width: (dayHourlyIndex === -1 && !isCurrentDayInfo) ? '620px' : '430px' }} >
                    <div className={"back "} style={{ display: (dayHourlyIndex === -1 || isCurrentDayInfo) ? 'none' : '' }}>
                        <img src="/back.svg" alt="" onClick={switchToDailyData} />
                    </div>
                    <div className="tabs f-row  j-center">
                        <div className="tab" onClick={() => setDisplayType(true)}><div className={"tab-line-1" + ((isCurrentDayInfo) ? ' tab-line-1-selected' : '')}></div>today</div>
                        <div className="tab" onClick={() => setDisplayType(false)}><div className={"tab-line-2" + ((isCurrentDayInfo) ? '' : ' tab-line-2-selected')}></div>next 5 days</div>
                        <div className="tab-indicator" style={{ width: cardsTabIndicatorStyle.width, left: cardsTabIndicatorStyle.left }}></div>
                    </div>
                </div>
                <div className={"f-col a-center cards-container" + ((flipCards) ? ' flip-cards' : '')}
                    style={{ padding: (dayHourlyIndex === -1 || isCurrentDayInfo) ? '16px 0' : '0 0  16px 0', width: (dayHourlyIndex === -1 &&  !isCurrentDayInfo) ? '620px' : '400px' }} >
                    <div style={{ display: (isCurrentDayInfo) ? 'none' : 'flex', width: (dayHourlyIndex === -1 && !isCurrentDayInfo) ? '99%' : '100%' }} className="w-99p  j-center" >
                        <CardData hourlyData={hourlyData} dayHourlyIndex={dayHourlyIndex} loading={loading} flipCard={flipCard} flipCards={false} items={items} onDaySelect={(index) => onDaySelect(index)} switchToDailyData={switchToDailyData} />
                    </div>
                    <div style={{ display: (isCurrentDayInfo) ? 'flex' : 'none' }} className="w-99p  j-center">
                        <CurrentDayInfo flipCards={false} currentDayData={(items) ? items.current : {}} />
                    </div>
                </div>

            </div>
    }

    return weatherUI;

}

export default Weather;