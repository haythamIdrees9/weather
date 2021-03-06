import React, { useEffect } from "react";
import { useState } from "react";
import "./searchable.select.scss";

/**
 * @author Haytham Idrees
 * I created this custom select to use it instead of use react select, to reduce the bundle size and exercise on react
 * @param props 
 */
function Select(props: {placeholder:string,noOptionMessage: string, width: number, height: number,selectedIndex:number, options: string[], onChange: (value: any) => void }) {
    const [opened, setOpened] = useState<boolean>(false);// true if select is opened
    const [closed, setClosed] = useState<boolean>(false);// true if select opened then closed
    const [options, setOptions] = useState<string[]>([]);// list of options that will be filtered on user input
    const [InputRef, setInputRef] = useState<React.RefObject<any>>(React.createRef()); // to interact with input element
    const [componentRef, setComponentRef] = useState<React.RefObject<any>>(React.createRef()); // to indicate if user click outside the select component
    const [selectedOption, setSelectedOption] = useState<string>(""); 

    useEffect(() => {
        setOptions([...props.options])
        if(props.selectedIndex >= 0){
            setSelectedOption(props.options[props.selectedIndex])
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // on destroy remove event listener 
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])


    /**
     * handle change on user filter input
     * @param event 
     */
    function handleChange(event: any) {
        let userInput = event?.target?.value;
        if (!userInput) {
            setOptions(props.options);
            return;
        }
        let options = props.options.filter(ele => ele.toLowerCase().includes(userInput.toLowerCase()))
        setOptions(options);
    }

    function onOptionSelected(option: string) {
        if(option === selectedOption){
            return;
        }
        setSelectedOption(option);
        setOpened(false);
        onClosed();
        props.onChange(option);
    }



    function handleClickOutside(event: Event) {
        // if select is opened and user click outside it we want to close it
        if (componentRef.current && !componentRef.current.contains(event.target)) {
            setOpened(false);
            onClosed();
        }
    }

    /**
     * handle actions on close select
     */
    function onClosed() {
        // handle action after closing the select to enhance the User experience 
        if (InputRef?.current) {
            setTimeout(() => {
                InputRef.current.value = "";
                setOptions([...props.options])
            }, 350)
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
            onClosed();
        }
        setOpened(!opened);
        setClosed(true);
    }


    return (
        <div className={"select-container f-row j-center " + ((opened) ? 'opened' : (closed) ? 'closed' : '')} ref={componentRef} >
            <div className="select br-4px b-black-1px" style={{ width: props.width + 'px', height: props.height + 'px' }} onClick={toggle}>
                {selectedOption ?
                    <div className="option-selected">
                        {selectedOption}
                    </div>
                    :
                    <div className="option-not-selected">
                        {props.placeholder}
                    </div>
                    }
                <img src='/images/arrow-up.svg' alt="arrow up" />
            </div>
            <div className="options br-4px" style={{ top: (props.height + 4) + 'px' }}>
                <div className="input-container">
                    <input type="text" name="filter" onChange={handleChange} ref={InputRef} placeholder="filter..." />
                </div>
                <div className="options-list" >
                    {
                        options.length > 0 ?
                            options.map(option => <div key={option} className={'option ' + ((selectedOption === option)?'selected-option':'')} onClick={() => onOptionSelected(option)}> {option} </div>)
                            : <div>{props.noOptionMessage}</div>
                    }

                </div>
            </div>
        </div>
    );
}


export default Select;