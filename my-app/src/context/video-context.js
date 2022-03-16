import { createContext } from 'react'
import useVideo from '../hooks/useVideo';

const INITIAL_VIDEO_STATE = { videos: {} };

const VideoContext = createContext({
    videoPlayer: {},
    changeSeconds: () => { },
    changeVideo: () => { },
    loadVideos: () => { }
});

const VideoProvider = (props) => {
    const [videoPlayer, dispatchVideoPlayer] = useVideo(INITIAL_VIDEO_STATE)

    const changeSeconds = (id, seconds) => {
        dispatchVideoPlayer({ type: "VIDEO", id, seconds });
    };

    const changeVideo = (id, seconds, video, showPlayback) => {
        dispatchVideoPlayer({ type: "VIDEO", id, seconds, video, showPlayback });
    };

    const loadVideos = (videos, token) => {
        dispatchVideoPlayer({ type: "HOME", videos, token });
    };

    const provider = {
        videoPlayer,
        changeSeconds,
        changeVideo,
        loadVideos
    };

    return (
        <VideoContext.Provider value={provider}>
            {props.children}
        </VideoContext.Provider>
    );
};


export { VideoContext };

export default VideoProvider;