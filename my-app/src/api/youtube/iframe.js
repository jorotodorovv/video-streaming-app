import { useEffect } from "react";

const YoutubeFrame = (props) => {
    useEffect(() => {
        if (window.YT) {
            window.player =
                new window.YT.Player(props.opts.videoId, props.opts);
        }
    }, [props.opts, window.YT]);

    return <div id={props.opts.videoId}></div>;
};

export default YoutubeFrame;