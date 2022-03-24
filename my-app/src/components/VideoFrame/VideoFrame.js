import { forwardRef, useMemo } from 'react';

import YouTube from 'react-youtube';

import Wrapper from '../../hoc/Wrapper';

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

const VideoPlayer = forwardRef((props, ref) => {
    const opts = useMemo(() => {
        return {
            height: props.height ?? MAX_HEIGHT,
            width: props.width ?? MAX_WIDTH,
            playerVars: {
                start: props.seconds,
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
                fs: 0,
            }
        };
    }, []);

    const onReady = (e) => {
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

    return (
        <Wrapper ref={ref}>
            <YouTube
                videoId={props.id}
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
                onEnd={onEnd}
            />
        </Wrapper>
    );
});

export default VideoPlayer;