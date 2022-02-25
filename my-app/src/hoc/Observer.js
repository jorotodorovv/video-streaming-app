import React, { useEffect, useMemo, useRef, useState } from "react";

import DOMObserver from "../helpers/dom/DomObserver.ts";
import Wrapper from "./Wrapper";

const Observer = (props) => {
    const ref = useRef();
    const [lock, setLock] = useState(false); //configure lock functionality

    const observer = useMemo(() => {
        return new DOMObserver(ref, props.callback);
    }, [props.callback])

    useEffect(() => {
        observer.observe();

        return () => {
            observer.unobserve();
        }
    }, [observer, ...props.state])

    return (
        <Wrapper ref={ref}>
            {props.children}
        </Wrapper>
    )
};

export default Observer;