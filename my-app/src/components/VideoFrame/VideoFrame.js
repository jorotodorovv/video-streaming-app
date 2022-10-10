import { useMemo } from 'react';

import YoutubeFrame from '../../api/youtube/iframe.js';

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

const VideoPlayer = (props) => {
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
                onEnd,
            },
        };
    }, []);

    const onReady = (e) => {
        e.target.playVideo();

        props.onSetInterval(e);
    };

    const onStateChange = (e) => {
        if (e.data === window.YT.PlayerState.PLAYING) {
            props.onSetSeconds(e);
        }
    };

    const onEnd = (e) => {
        props.onClearInterval(e, props.interval);
        props.onResetPlayer(e);
    };

    return <YoutubeFrame opts={opts} />;
};

export default VideoPlayer;