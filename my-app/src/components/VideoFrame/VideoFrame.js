import { useContext } from 'react';

import YoutubeFrame from '../../api/youtube/iframe.js';

import { VideoContext } from '../../context/video-context.js';

const VideoFrame = (props) => {
    const { videoSettings } = useContext(VideoContext);

    const preserveHandler = (e, seconds) => {
        props.onSaveSeconds(e, seconds);
    };

    const endHandler = (e) => {
        props.onResetSeconds(e);
    };

    return <YoutubeFrame {...props}
        settings={videoSettings}
        onPreserve={preserveHandler}
        onEnd={endHandler} />;
};

export default VideoFrame;