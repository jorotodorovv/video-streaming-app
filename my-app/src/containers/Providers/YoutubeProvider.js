import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'

import VideoContext from '../../context/VideoContext'

import Home from '../Home/Home'
import Video from '../Video/Video'

const YoutubeProvider = () => {
    const [videoData, setVideoData] = useState({ video: {}, seconds: 0 })

    return (
        <VideoContext.Provider value={[videoData, setVideoData]}>
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