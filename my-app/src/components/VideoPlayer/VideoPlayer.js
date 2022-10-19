import { useContext } from 'react';

import { VideoContext } from '../../context/video-context';

import VideoFrame from '../VideoFrame/VideoFrame'

const VideoPlayer = (props) => {
    const { changeSeconds, resetSeconds, removePlayback } = useContext(VideoContext);

    const saveSecondsHandler = (e, seconds) => {
        if (seconds) {
            changeSeconds(props.id, seconds);
        }
    };

    const setSecondsHandler = (e) => {
        // let seconds = setSeconds(e);

        // if (props.onNavigateTime) {
        //     props.onNavigateTime(seconds);
        // }
    };

    const resetSecondsHandler = (e) => {
        resetSeconds(props.id);
        removePlayback();
    };

    return <VideoFrame
        {...props}
        onSetSeconds={setSecondsHandler}
        onResetSeconds={resetSecondsHandler}
        onSaveSeconds={saveSecondsHandler}
    />
};

export default VideoPlayer;