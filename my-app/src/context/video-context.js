import { createContext } from 'react'
import useVideo, { actionTypes } from '../hooks/useVideo';

const VideoContext = createContext({
    videoPlayer: {},
    changeSeconds: () => { },
    changeVideo: () => { },
    loadVideos: () => { }
});

const INITIAL_VIDEO_STATE = { videos: {} };

const VideoProvider = (props) => {
    const [videoPlayer, dispatchVideoPlayer] = useVideo(INITIAL_VIDEO_STATE)

    const renderVideos = (videos, token) => {
        dispatchVideoPlayer({ type: actionTypes.collection, videos, token });
    };

    const changeVideo = (id, video) => {
        dispatchVideoPlayer({ type: actionTypes.video, id, video });
    };

    const changeSeconds = (id, seconds) => {
        dispatchVideoPlayer({ type: actionTypes.seconds, id, seconds });
    };

    const provider = {
        videoPlayer,
        renderVideos,
        changeVideo,
        changeSeconds,
    };

    return (
        <VideoContext.Provider value={provider}>
            {props.children}
        </VideoContext.Provider>
    );
};


export { VideoContext };

export default VideoProvider;