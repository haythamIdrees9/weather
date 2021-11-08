import { useEffect, useState } from "react"
import WeatherService from "../services/weather.services";
import Select from "./custom/select/searchable-select";
import "./weather.scss"

function Weather() {
    const [error, setError] = useState<any>(null);
    const [isloaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState<any>([]);
    const [counter, setCounter] = useState<number>(0);
    const cities = ["palestine","USA","palestine1" ,"palestine2","palestine3","palestine4","palestine5"]
    useEffect(() => {
        getWeatherData();
    },[])

    function onChange(e: string) {
        console.log('e', e);

    }
    function getWeatherData() {

        WeatherService.getWeatherData().then(res => res.json())
            .then((result) => {
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
    } else if (!isloaded) {
        weathereUI = <div>Loading...</div>
    } else {
        weathereUI =
            <div className="container f-col a-center">
                <Select height={40} width={264} options={cities}  onChange={(e) => { onChange(e) }} />
                <ul>
                    <div onClick={getWeatherData} key={item.location.name}>
                        <div className="name">
                            {item.location.name}:
                        </div>
                        <div className="data">
                            current degree {item.current.temp_c} {counter}
                        </div>
                    </div>

                </ul>
            </div>
    }

    return weathereUI;

}

export default Weather;