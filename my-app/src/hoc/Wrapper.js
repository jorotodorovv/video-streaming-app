import { forwardRef } from "react";

const Wrapper = forwardRef((props, ref) => {
    if (ref) {
        return (
            <div ref={ref}>
                {props.children}
            </div>
        );
    }

    return props.children;
});

export default Wrapper;