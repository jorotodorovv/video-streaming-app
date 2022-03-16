import { createContext } from 'react'
import useVideo from '../hooks/useVideo';

const INITIAL_VIDEO_STATE = { videos: {} };

const VideoContext = createContext({});

const VideoProvider = (props) => {
    const [videoPlayer, dispatchVideoPlayer] = useVideo(INITIAL_VIDEO_STATE)

    return (
        <VideoContext.Provider value={[videoPlayer, dispatchVideoPlayer]}>
            {props.children}
        </VideoContext.Provider>
    );
};


export { VideoContext };

export default VideoProvider;