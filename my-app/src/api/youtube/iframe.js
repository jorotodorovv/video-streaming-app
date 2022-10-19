import { useEffect, useMemo } from "react";

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

const REQUEST_SECONDS_DELAY = 0.25;

const YoutubeFrame = (props) => {
    const getSeconds = (e) => {
        let time = window.player.getCurrentTime() + REQUEST_SECONDS_DELAY;
        let seconds = Math.ceil(time);

        return seconds;
    };

    const onCancel = (e) => {
        if (props.onCancel) {
            let seconds = getSeconds(e);
            props.onCancel(e, seconds);
        }
    };

    const opts = useMemo(() => {
        return {
            videoId: props.id,
            height: props.height ?? MAX_HEIGHT,
            width: props.width ?? MAX_WIDTH,
            playerVars: {
                start: props.seconds,
                autoplay: 1,
                modestbranding: 1,
                enablejsapi: 1,
                rel: 0,
                fs: 0,
            },
            events: {
                onReady: props.onReady,
                onStateChange: props.onStateChange,
                onEnd: props.onEnd,
            },
        };
    }, [props.seconds]);

    useEffect(() => {
        if (window.YT) {
            window.player =
                new window.YT.Player(opts.videoId, opts);
        }

        return () => {
            onCancel();
        };
    }, [window.YT]);

    return <div id={opts.videoId}></div>;
};

export default YoutubeFrame;