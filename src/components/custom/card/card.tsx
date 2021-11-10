import "./card.scss"
function Card(props: { day: string, date: string, morningDegree: number, EveningDegree: number, summery: string,class:string,index:number,onClick: (value: any) => void }) {
    return (
        <div className={'card-container '+ props.class } onClick={() => props.onClick(props.index)}>
            <div className="day-name">
                {props.day}
            </div>
            <div className="date">
                {props.date}
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
                    {props.morningDegree}
                    <img src="/sun-with-cloud.png" alt="" />
                </div>
                <div className="value f-row a-center j-between">
                    {props.EveningDegree}
                    <img src="/moon.png" alt="" />
                </div>
            </div>
            <div className="day-summary">
                {props.summery}
            </div>
        </div>
    );
}

export default Card;
