import { useEffect, useMemo } from "react";

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

const REQUEST_SECONDS_DELAY = 0.25;

const YoutubeFrame = (props) => {
    const getSeconds = (e) => {
        let time = e.target.getCurrentTime() + REQUEST_SECONDS_DELAY;
        let seconds = Math.ceil(time);

        return seconds;
    };

    const onReady = (e) => {
        if (props.onReady) {
            props.onReady();
        }

        e.target.preserve = onPreserve.bind(this, e);
    }

    const onStateChange = (e) => {
        switch (e.data) {
            case YT.PlayerState.PLAYING:
                if (props.onPlaying) {
                    props.onPlaying();
                }
                break;
            case YT.PlayerState.ENDED:
                if (props.onEnd) {
                    props.onEnd();
                }
                break;
        }
    };

    const onPreserve = (e) => {
        if (props.onPreserve &&
            e.target.getPlayerState &&
            e.target.getPlayerState() === YT.PlayerState.PLAYING) {
            let seconds = getSeconds(e);
            props.onPreserve(e, seconds);
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
                onReady,
                onStateChange,
            },
        };
    }, [props.seconds]);

    useEffect(() => {
        if (YT) {
            window.player =
                new YT.Player(opts.videoId, opts);
        }

        return () => {
            if (window.player) {
                window.player.preserve();
                window.player.destroy();
            }
        };
    }, [YT]);

    return <div id={opts.videoId}></div>;
};

export default YoutubeFrame;