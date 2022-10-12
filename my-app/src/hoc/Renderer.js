import { useState } from "react";
import Wrapper from "./Wrapper";

const Renderer = (props) => {
    var [rendered, setRendered] = useState(false);

    const loadHandler = () => setRendered(true);

    let className = rendered ? [props.className, props.activeClass] : [props.className];

    return <Wrapper
        className={className.join(' ')}
        onLoad={loadHandler}>
        {props.children}
    </Wrapper>
};

export default Renderer;