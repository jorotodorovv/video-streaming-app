import { forwardRef, useContext, useEffect, useState } from 'react';

import { VideoContext } from '../../context/video-context';

import VideoFrame from '../VideoFrame/VideoFrame'

const INTERVAL_SECONDS_ADVANTAGE = 0.25;
const INTERVAL_DURATION = 1000;

const VideoPlayer = forwardRef((props, ref) => {
    const { changeSeconds, resetSeconds, removePlayback } = useContext(VideoContext);
    const [secondsInterval, setSecondsInterval] = useState();

    useEffect(() => {
        return () => {
            clearIntervalHandler(this, secondsInterval);
        };
    }, [secondsInterval]);

    const setSeconds = (e, increment = 0) => {
        let time = e.target.getCurrentTime() + increment;
        let seconds = Math.ceil(time);

        changeSeconds(props.id, seconds);

        return seconds;
    };

    const setSecondsHandler = (e) => {
        let seconds = setSeconds(e);

        if (props.onNavigateTime) {
            props.onNavigateTime(seconds);
        }
    };

    const setIntervalHandler = (e) => {
        if (!secondsInterval) {
            let interval = setInterval(() => {
                setSeconds(e, INTERVAL_SECONDS_ADVANTAGE);
            }, INTERVAL_DURATION);

            setSecondsInterval(interval);
        };
    }

    const clearIntervalHandler = (e, interval) => {
        if (interval) {
            clearInterval(interval);
        }
    };

    const resetPlayerHandler = (e) => {
        resetSeconds(props.id);
        removePlayback();
    }

    return <VideoFrame
        {...props}
        ref={ref}
        interval={secondsInterval}
        onSetSeconds={setSecondsHandler}
        onSetInterval={setIntervalHandler}
        onClearInterval={clearIntervalHandler}
        onResetPlayer={resetPlayerHandler}
    />
});

export default VideoPlayer;