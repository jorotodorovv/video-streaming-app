import { Route, Routes } from 'react-router-dom'

import VideoContext from '../../context/VideoContext'

import { INITIAL_TOKEN_VALUE } from "../../api/youtube.ts";

import Home from '../Home/Home'
import Video from '../Video/Video'
import useVideo from '../../hooks/useVideo';

const YoutubeProvider = () => {
    const [videoPlayer, dispatchVideoPLayer] = useVideo({ videos: {}, token: INITIAL_TOKEN_VALUE })

    return (
        <VideoContext.Provider value={[videoPlayer, dispatchVideoPLayer]}>
            <Routes>
                <Route path='/youtube'>
                    <Route path='/youtube' element={<Home />} />
                    <Route path='/youtube/videos/:id' element={<Video />} />
                </Route>
            </Routes>
        </VideoContext.Provider>
    );
};

export default YoutubeProvider;