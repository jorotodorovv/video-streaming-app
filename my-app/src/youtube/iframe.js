import { useEffect, useMemo } from "react";

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

const YoutubeFrame = (props) => {
    const getSeconds = (e) => {
        let seconds = e.target.getCurrentTime();
        return Math.ceil(seconds);
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
                ...props.settings.playerVars,
                start: props.seconds,
            },
            events: {
                onReady,
                onStateChange,
            },
        };
    }, [props.settings, props.seconds]);

    useEffect(() => {
        let player;

        if (YT) {
            player = new YT.Player(opts.videoId, opts);
        }

        return () => {
            if (player) {
                if (player.preserve) {
                    player.preserve();
                }

                player.destroy();
            }
        };
    }, [YT]);

    return <div id={opts.videoId}></div>;
};

export default YoutubeFrame;