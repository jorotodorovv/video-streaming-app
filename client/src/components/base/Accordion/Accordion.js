import { useState } from "react";
import Wrapper from "../../../hoc/Wrapper";

const Accordion = (props) => {
    var [toggled, setToggle] = useState(false);

    let panelClass = toggled ?
        [props.panelClass, props.activeClass] : [props.panelClass];

    return <>
        <button
            onClick={() => setToggle(!toggled)}
            className={props.buttonClass}>
            {props.title}
        </button>
        <div class={panelClass.join(' ')}>
            {props.children}
        </div>
    </>;
};

export default Accordion;