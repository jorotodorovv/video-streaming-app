import { useContext } from 'react';
import { SettingsContext } from '../../context/settings-context';

import { VideoContext } from '../../context/video-context';

const VideoPlayer = (props) => {
    const Frame = props.frame;

    const { videoSettings } = useContext(SettingsContext);
    const { changeSeconds, resetSeconds, removePlayback } = useContext(VideoContext);

    const setSecondsHandler = (e) => {
        // let seconds = setSeconds(e);

        // if (props.onNavigateTime) {
        //     props.onNavigateTime(seconds);
        // }
    };

    const preserveHandler = (e, seconds) => {
        if (seconds) {
            changeSeconds(props.id, seconds);
        }
    };

    const endHandler = (e) => {
        resetSeconds(props.id);
        removePlayback();
    };

    return <Frame
        id={props.id}
        width={props.width}
        height={props.height}
        seconds={props.seconds}
        settings={videoSettings}
        onPreserve={preserveHandler}
        onEnd={endHandler} />;
};

export default VideoPlayer;