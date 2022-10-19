import YoutubeFrame from '../../api/youtube/iframe.js';

const VideoPlayer = (props) => {
    const cancelHandler = (e, seconds) => {
        props.onSaveSeconds(e, seconds);
    };

    const endHandler = (e) => {
        props.onResetSeconds(e);
    };

    return <YoutubeFrame {...props} 
            onCancel={cancelHandler}
            onEnd={endHandler} />;
};

export default VideoPlayer;