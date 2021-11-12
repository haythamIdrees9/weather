import "./current-day-info.scss"
function CurrentDayInfo(props: {  flipCards: boolean, currentDayData: any }) {

    return (

        <div className={"current-day-info " + ((props.flipCards) ? 'flip-cards ' : '')}>
                current day info
        </div>
    )
}

export default CurrentDayInfo;