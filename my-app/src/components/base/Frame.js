import { forwardRef } from "react";

const Frame = forwardRef((props, ref) => {
    return <iframe
    ref={ref}
    width={props.width} 
    height={props.height} 
    src={props.src} 
    frameBorder="0" 
    allowFullScreen/>
});

export default Frame;