import Card from "../../custom/card/card";
import "./card-data.scss"

function onSubscriptionClicked() {
    alert('Something went wrong, we are working on the problem, Please try again later!')
}

function CardData(props: {dayHourlyIndex:number, loading: boolean, flipCard: boolean,flipCards:boolean, items: any, onDaySelect: (value: number) => void }) {
    return (

        <div  className={"cards-data " + ((props.flipCards) ? 'flip-cards ' : '') + ((props.dayHourlyIndex !== -1)?'hourly':'')}> 
            <div className={(props.loading ? 'loading f-col j-center a-center' : 'loaded')}>
                <img src="/loading-sun.png" className="loading-sun"></img>
                loading...
            </div>
            <div className="daily-data f-row j-between">

            <Card onClick={(index) => props.onDaySelect(index)} index={0} class={props.flipCard ? 'flip-card' : ''} day="Sunday" date={props.items.forecast.forecastday[0].date} morningDegree={props.items.forecast.forecastday[0].day.maxtemp_c} EveningDegree={props.items.forecast.forecastday[0].day.mintemp_c} summery="cloudy" />
            <Card onClick={(index) => props.onDaySelect(index)} index={1} class={props.flipCard ? 'flip-card' : ''} day="Sunday" date={props.items.forecast.forecastday[1].date} morningDegree={props.items.forecast.forecastday[1].day.maxtemp_c} EveningDegree={props.items.forecast.forecastday[1].day.mintemp_c} summery="cloudy" />
            <Card onClick={(index) => props.onDaySelect(index)} index={2} class={props.flipCard ? 'flip-card' : ''} day="Sunday" date={props.items.forecast.forecastday[2].date} morningDegree={props.items.forecast.forecastday[2].day.maxtemp_c} EveningDegree={props.items.forecast.forecastday[2].day.mintemp_c} summery="cloudy" />
            <Card onClick={(index) => props.onDaySelect(index)} index={3} class={props.flipCard ? 'flip-card' : ''} day="Sunday" date="20/11/2021" morningDegree={20} EveningDegree={10} summery="cloudy" />
            <Card onClick={(index) => props.onDaySelect(index)} index={4} class={props.flipCard ? 'flip-card' : ''} day="Sunday" date="20/11/2021" morningDegree={20} EveningDegree={10} summery="cloudy" />

            <div className="subscription-card-container" onClick={onSubscriptionClicked}>
                <div >
                    <img src="/eye.svg" alt="" />

                    subscribe now and get 14 days of forecasting
                </div>
            </div>
            </div>

            <div className="hourly-data">
            hourly-data
            </div>
        </div>
    )
}

export default CardData;