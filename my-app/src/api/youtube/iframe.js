import { useCallback, useEffect, useMemo, useState } from "react";

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

const REQUEST_SECONDS_DELAY = 0.25;

const YoutubeFrame = (props) => {
    const [state, setState] = useState();

    const getSeconds = (e) => {
        let time = window.player.getCurrentTime() + REQUEST_SECONDS_DELAY;
        let seconds = Math.ceil(time);

        return seconds;
    };

    const onReady = (e) => {
        if (props.onReady) {
            props.onReady();
        }
    }

    const onStateChange = (e) => {
        setState(state => e.data);
    };

    const onPreserve = (e) => {
        if (props.onPreserve && state !== YT.PlayerState.ENDED) {
            let seconds = getSeconds(e);
            props.onPreserve(e, seconds);
        }
    };

    const onPlaying = (e) => {
        if (props.onPlaying) {
            props.onPlaying();
        }
    }

    const onEnd = (e) => {
        if (props.onEnd) {
            props.onEnd();
        }
    }

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
                onReady,
                onStateChange,
            },
        };
    }, [props.seconds]);

    useEffect(() => {
        switch (state) {
            case YT.PlayerState.PLAYING:
                onPlaying();
                break;
            case YT.PlayerState.ENDED:
                onEnd();
                break;
        }

        return () => {
            onPreserve();
        };
    }, [state])

    useEffect(() => {
        if (YT) {
            window.player =
                new YT.Player(opts.videoId, opts);
        }
    }, [YT]);

    return <div id={opts.videoId}></div>;
};

export default YoutubeFrame;