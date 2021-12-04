import Card from "../card/card";
import "./card-data.scss";

function onSubscriptionClicked() {
    alert('Sorry, this feature is not available right now!')
}



function CardData(props: { dayHourlyIndex: number, hourlyData: any, loading: boolean, flipCard: boolean, flipCards: boolean, items: any, onDaySelect: (value: number) => void, switchToDailyData: () => void }) {
    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    return (

        <div className={"cards-data " + ((props.flipCards) ? 'flip-cards ' : '') + ((props.dayHourlyIndex !== -1) ? 'hourly' : '')}>
            <div className={(props.loading ? 'loading f-col j-center a-center' : 'loaded')}>
                <img src="/loading-sun.png" className="loading-sun"></img>
                loading...
            </div>
            <div className={(props.dayHourlyIndex === -1)?'px-16px':''}>
                <div  className="daily-data f-row j-between" >

                    <Card onClick={(index) => props.onDaySelect(index)} index={0} class={props.flipCard ? 'flip-card' : ''} date={props.items.forecast.forecastday[0].date} dayData={props.items.forecast.forecastday[0]} />
                    <Card onClick={(index) => props.onDaySelect(index)} index={1} class={props.flipCard ? 'flip-card' : ''} date={props.items.forecast.forecastday[1].date} dayData={props.items.forecast.forecastday[1]} />
                    <Card onClick={(index) => props.onDaySelect(index)} index={2} class={props.flipCard ? 'flip-card' : ''} date={props.items.forecast.forecastday[2].date} dayData={props.items.forecast.forecastday[2]} />
                    {/* <Card onClick={(index) => props.onDaySelect(index)} index={3} class={props.flipCard ? 'flip-card' : ''} date={props.items.forecast.forecastday[3].date} dayData={props.items.forecast.forecastday[3]} /> */}
                    {/* <Card onClick={(index) => props.onDaySelect(index)} index={4} class={props.flipCard ? 'flip-card' : ''} date={props.items.forecast.forecastday[4].date} dayData={props.items.forecast.forecastday[4]} /> */}

                    <div className="subscription-card-container" onClick={onSubscriptionClicked}>
                        <div >
                            <img src="/eye.svg" alt="" />
                            subscribe now and get 14 days of forecasting
                        </div>
                    </div>
                    <div className="subscription-card-container" onClick={onSubscriptionClicked}>
                        <div >
                            <img src="/eye.svg" alt="" />
                            subscribe now and get 14 days of forecasting
                        </div>
                    </div>
                    <div className="subscription-card-container" onClick={onSubscriptionClicked}>
                        <div >
                            <img src="/eye.svg" alt="" />
                            subscribe now and get 14 days of forecasting
                        </div>
                    </div>
                </div>

                <div className="hourly-data">
                    <div className="title">
                    {(props.dayHourlyIndex >= 0)?weekDays[new Date(props.items.forecast.forecastday[props.dayHourlyIndex].date).getDay()]:''}
                    </div>
                    <div className="hours-list">
                        {props.hourlyData}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardData;