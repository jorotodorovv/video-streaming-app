import { forwardRef, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import YouTube from 'react-youtube';
import { VideoContext } from '../../context/video-context';

import Wrapper from '../../hoc/Wrapper';

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

const VideoPlayer = forwardRef((props, ref) => {
    const { changeSeconds, removePlayback, refreshSeconds } = useContext(VideoContext);
    const [secondsInterval, setSecondsInterval] = useState();

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

    useEffect(() => {
        return () => {
            clearIntervalHandler(secondsInterval);
        };
    }, [secondsInterval]);

    const stateChangeHandler = (e) => {
        let seconds = secondsCheckHandler(e);

        if (props.onNavigateTime) {
            props.onNavigateTime(seconds);
        }
    };

    const secondsCheckHandler = (e) => {
        let seconds = ~~e.target.getCurrentTime();
        changeSeconds(props.id, seconds);

        return seconds;
    };

    const setIntervalHandler = (e) => {
        if (!secondsInterval) {
            const interval = setInterval(() => {
                secondsCheckHandler(e);
            }, 1000)
            setSecondsInterval(interval);
        };
    }

    const clearIntervalHandler = (interval) => {
        if (interval) {
            clearInterval(interval);
        }
    };

    const onReady = (e) => {
        setIntervalHandler(e);
    };

    const onStateChange = (e) => {
        if (e.data === window.YT.PlayerState.PLAYING) {
            stateChangeHandler(e);
        }
    };

    const onEnd = (e) => {
        removePlayback();
        clearIntervalHandler(secondsInterval);
        refreshSeconds(props.id);
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