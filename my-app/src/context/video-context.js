import { useState, createContext } from 'react'
import useVideo, { actions } from '../hooks/useVideo';

const VideoContext = createContext({
    videoPlayer: {},
    changeSeconds: () => { },
    changeVideo: () => { },
    loadVideos: () => { }
});

const INITIAL_VIDEO_STATE = { videos: {} };

const VideoProvider = (props) => {
    const [videoPlayer, dispatchVideoPlayer] = useVideo(INITIAL_VIDEO_STATE)
    const [gToken, setGToken] = useState();

    const renderVideos = (videos, token) => {
        dispatchVideoPlayer({ reducer: actions.collection, videos, token });
    };

    const clearVideos = () => {
        dispatchVideoPlayer({ reducer: actions.clear });
    };

    const changeVideo = (id, video) => {
        dispatchVideoPlayer({ reducer: actions.video, id, video });
    };

    const changeSeconds = (id, seconds) => {
        dispatchVideoPlayer({ reducer: actions.seconds, id, seconds });
    };

    const resetSeconds = (id) => {
        dispatchVideoPlayer({ reducer: actions.seconds, id, seconds: 0 });
    };

    const changePlayback = (id) => {
        dispatchVideoPlayer({ reducer: actions.playback, id });
    };

    const removePlayback = () => {
        dispatchVideoPlayer({ reducer: actions.playback, id: null });
    };

    const changePlayer = (id, video, seconds) => {
        dispatchVideoPlayer({ reducer: actions.player, id, video, seconds });
    };

    const changeGToken = (token) => {
        setGToken(token);
    };

    const provider = {
        videoPlayer,
        gToken,

        renderVideos,
        clearVideos,
        changeVideo,
        changeSeconds,
        resetSeconds,
        changePlayback,
        removePlayback,
        changePlayer,
        changeGToken,
    };

    return (
        <VideoContext.Provider value={provider}>
            {props.children}
        </VideoContext.Provider>
    );
};


export { VideoContext };

export default VideoProvider;