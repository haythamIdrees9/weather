import "./card.scss"
function Card(props: { dayData:any,date: string,class:string,index:number,onClick: (value: any) => void }) {
    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const day = `${weekDays[new Date(props.date).getDay()]}`;
    return (
        <div className={'card-container '+ props.class } onClick={() => props.onClick(props.index)}>
            <div className="day-name">
                {day}
            </div>
            <div className="date">
                {props.dayData.date}
            </div>
            <div className="period f-row j-between">
                <div>
                    Morning
                </div>
                <div>
                    Evening
                </div>
            </div>
            <div className="values f-row j-between">
                <div className="value f-row a-center j-between">
                    {props.dayData.day.maxtemp_c}
                    <img src={props.dayData.hour[12].condition.icon} alt="" />
                </div>
                <div className="value f-row a-center j-between">
                    {props.dayData.day.mintemp_c}
                    <img src={props.dayData.hour[20].condition.icon} alt="" />
                </div>
            </div>
            <div className="day-summary">
                {props.dayData.day.condition.text}
            </div>
        </div>
    );
}

export default Card;
