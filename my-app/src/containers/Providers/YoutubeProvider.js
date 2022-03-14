import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'

import Home from '../Home/Home'
import Video from '../Video/Video'

import useVideo from '../../hooks/useVideo';
import VideoContext from '../../context/VideoContext'

import ProviderConfigurations from '../../api/youtube/config.ts';

const YoutubeProvider = () => {
    const [videoPlayer, dispatchVideoPlayer] = useVideo({ videos: {} })

    useEffect(() => {
        const initProvider = async () => {
            let config = new ProviderConfigurations("/configs/youtube.json");

            await config.init();

            dispatchVideoPlayer({ type: "INIT", config });
        };

        initProvider();
    }, []);

    return (
        <VideoContext.Provider value={[videoPlayer, dispatchVideoPlayer]}>
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