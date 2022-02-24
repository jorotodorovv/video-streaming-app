import React, { useEffect, useRef } from "react";

import DOMObserver from "../helpers/dom/DomObserver.ts";
import Wrapper from "./Wrapper";

const Observer = (props) => {
    const ref = useRef();

    const observer = new DOMObserver(ref, props.callback);

    useEffect(() => {
        observer.observe();

        return () => observer.unobserve();
    }, props.state)

    return (
        <Wrapper ref={ref}>
            {props.children}
        </Wrapper>
    )
};

export default Observer;