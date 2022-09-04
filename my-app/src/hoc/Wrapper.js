import { forwardRef } from "react";

const Wrapper = forwardRef((props, ref) => {
    if (ref || props.onClick) {
        return (
            <div onClick={props.onClick} ref={ref}>
                {props.children}
            </div>
        );
    }

    return props.children;
});

export default Wrapper;