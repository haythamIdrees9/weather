import { useState } from "react";
import "./seachable.select.scss"
function Select(props: { width: number, height: number, options: string[], onChange: (value: any) => void }) {
    const [opened, setOpened] = useState<boolean>(false);
    const [closed, setClosed] = useState<boolean>(false);
    function handleChange(value: any) {
        props.onChange(value.target.value);
    }

    function toggle() {
        setOpened(!opened);
        setClosed(true);
    }
    return (

        <div className={"container f-row j-center " + ((opened) ? 'opened' : (closed) ? 'closed' : '')} >
            <div className="select br-4px b-black-1px" style={{ width: props.width + 'px', height: props.height + 'px' }} onClick={toggle}>
                <img src='/images/arrow-up.svg' alt="arrow up" />
            </div>
            <div className="options br-4px" style={{ top: (props.height + 4) + 'px' }}>
                <div className="input-contaienr">
                    <input type="text" name="filter" onChange={handleChange} />
                </div>
                <div className="options-list" >

                    {props.options.map(option => <div className="option"> {option} </div>
                    )}

                </div>
            </div>
        </div>
    );
}


export default Select;