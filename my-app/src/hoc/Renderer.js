import { useState } from "react";
import Wrapper from "./Wrapper";

const Renderer = (props) => {
    var [rendered, setRendered] = useState(false);

    const loadHandler = () => setRendered(true);

    let className = rendered ? props.loadedClass : props.loadingClass;

    return <Wrapper
        className={className}
        onLoad={loadHandler}>
        {props.children}
    </Wrapper>
};

export default Renderer;