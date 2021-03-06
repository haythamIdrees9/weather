import "./current-day-info.scss"
function CurrentDayInfo(props: { flipCards: boolean, currentDayData: any,loading:boolean }) {
    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const MonthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDayDate = `${weekDays[new Date().getDay()]}, ${MonthsList[new Date().getMonth()]} ${new Date().getDate()}`;

    return (

        <div className={"current-day-info f-row  j-between" + ((props.flipCards) ? 'flip-cards ' : '')}>
            <div className={(props.loading ? 'loading f-col j-center a-center' : 'loaded')}>
                <img src="/loading-sun.png" className="loading-sun"></img>
                loading...
            </div>
            <div className="info">
                <div >
                    {currentDayDate}
                </div>
                <img src={props?.currentDayData?.condition?.icon} alt="" />
            </div>
            <div className="degree">
                {props.currentDayData.feelslike_c}<sup className="ml-1px">o</sup>
            </div>

        </div>
    )
}

export default CurrentDayInfo;