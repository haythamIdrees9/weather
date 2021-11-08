import React, { useEffect } from "react";
import { useState } from "react";
import "./seachable.select.scss"
function Select(props: { noOptionMessage:string,width: number, height: number, options: string[], onChange: (value: any) => void }) {
    const [opened, setOpened] = useState<boolean>(false);// true if select is opened
    const [closed, setClosed] = useState<boolean>(false);// true if select opened then closed
    const [options, setOptions] = useState<string[]>([]);// list of options that will be filtered on user input
    const [InputRef, setInputRef] = useState<React.RefObject<any>>(React.createRef());
    const [componentRef, setComponentRef] = useState<React.RefObject<any>>(React.createRef());
    let timeOut:NodeJS.Timeout;
    function handleChange(event: any) {
        let userInput  = event?.target?.value;
        if(!userInput){
            setOptions(props.options);
            return;
        }
        clearTimeout(timeOut);

        timeOut = setTimeout(() => {
            let options = props.options.filter(ele => ele.toLowerCase().includes(userInput.toLowerCase()))
            setOptions(options);
        }, 250);
    }
    
    useEffect(() => {
        setOptions([...props.options])
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // on destroy remove event listener 
                document.removeEventListener("mousedown", handleClickOutside);
            };
    },[])


    function handleClickOutside(event:Event) {
        // if select is opened and user click outside it we want to close it
        if (componentRef.current && !componentRef.current.contains(event.target)) {
            setOpened(false);
            InputRef.current.value = "";
        }
    }

    /**
     * toggle select open state
     */
    function toggle() {
        // if select opened then focus on input; else clear input text
        if (!opened) {
            InputRef?.current.focus();
        } else if (InputRef?.current?.value) {
            InputRef.current.value = "";
        }
        setOpened(!opened);
        setClosed(true);
    }
    
    return (

        <div className={"container f-row j-center " + ((opened) ? 'opened' : (closed) ? 'closed' : '')} ref={componentRef} >
            <div className="select br-4px b-black-1px" style={{ width: props.width + 'px', height: props.height + 'px' }} onClick={toggle}>
                <img src='/images/arrow-up.svg' alt="arrow up" />
            </div>
            <div className="options br-4px" style={{ top: (props.height + 4) + 'px' }}>
                <div className="input-container">
                    <input type="text" name="filter" onChange={handleChange} ref={InputRef} />
                </div>
                <div className="options-list" >

                    {
                        options.length > 0 ?
                        options.map(option => <div className="option"> {option} </div>)
                        : <div>{props.noOptionMessage}</div>
                    }

                </div>
            </div>
        </div>
    );
}


export default Select;