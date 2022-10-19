import YoutubeFrame from '../../api/youtube/iframe.js';

const VideoFrame = (props) => {
    const preserveHandler = (e, seconds) => {
        props.onSaveSeconds(e, seconds);
    };

    const endHandler = (e) => {
        props.onResetSeconds(e);
    };

    return <YoutubeFrame {...props}
        onPreserve={preserveHandler}
        onEnd={endHandler} />;
};

export default VideoFrame;