import { forwardRef } from "react";

const Wrapper = forwardRef((props, ref) => {
    if (ref || props.onClick || props.className) {
        return (
            <div className={props.className} onClick={props.onClick} ref={ref}>
                {props.children}
            </div>
        );
    }

    return props.children;
});

export default Wrapper;