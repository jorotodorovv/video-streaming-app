import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'

import Home from '../Home/Home'
import Video from '../Video/Video'

import useVideo from '../../hooks/useVideo';
import VideoContext from '../../context/VideoContext'

import YoutubeApi from '../../api/youtube/youtube.ts';
import ProviderConfigurations from '../../api/youtube/config.ts';

const YoutubeProvider = () => {
    const [videoPlayer, dispatchVideoPlayer] = useVideo({ videos: {} })
    const [videoConfig, setVideoConfig] = useState();

    useEffect(() => {
        const initProvider = async () => {
            let config = new ProviderConfigurations("/configs/youtube.json");
            await config.init();

            setVideoConfig(config);
        };

        initProvider();
    }, []);

    const api = useCallback((parameters) => {
        if (videoConfig) {
            return new YoutubeApi(
                videoConfig,
                parameters);
        }
    }, [videoConfig])

    const home = <Home api={api}/>;
    const video = <Video api={api}/>;

    return (
        <VideoContext.Provider value={[videoPlayer, dispatchVideoPlayer]}>
            <Routes>
                <Route path='/youtube'>
                    <Route path='/youtube' element={home} />
                    <Route path='/youtube/videos/:id' element={video} />
                </Route>
            </Routes>
        </VideoContext.Provider>
    );
};

export default YoutubeProvider;