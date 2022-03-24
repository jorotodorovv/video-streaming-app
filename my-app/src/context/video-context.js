import { createContext } from 'react'
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

    const renderVideos = (videos, token) => {
        dispatchVideoPlayer({ reducer: actions.collection, videos, token });
    };

    const changeVideo = (id, video) => {
        dispatchVideoPlayer({ reducer: actions.video, id, video });
    };

    const changeSeconds = (id, seconds) => {
        dispatchVideoPlayer({ reducer: actions.seconds, id, seconds });
    };

    const refreshSeconds = (id) => {
        dispatchVideoPlayer({ reducer: actions.seconds, id, seconds: 0});
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

    const provider = {
        videoPlayer,
        renderVideos,
        changeVideo,
        changeSeconds,
        refreshSeconds,
        changePlayback,
        removePlayback,
        changePlayer,
    };

    return (
        <VideoContext.Provider value={provider}>
            {props.children}
        </VideoContext.Provider>
    );
};


export { VideoContext };

export default VideoProvider;