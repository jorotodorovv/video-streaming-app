import { useCallback, useEffect, useState } from 'react';

import Home from '../Home/Home'
import Video from '../Video/Video'

import useVideo from '../../hooks/useVideo';
import VideoContext from '../../context/VideoContext'

import YoutubeApi from '../../api/youtube/youtube.ts';
import ProviderConfigurations from '../../api/youtube/config.ts';

import RouteBuilder from '../../helpers/routes/RouteBuilder.tsx';

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

    const containers = [
        { Page: Home, path: "/youtube" },
        { Page: Video, path: "/youtube/videos/:id" },
    ];

    const routeBuilder = new RouteBuilder(containers, { api });

    const routes = routeBuilder.render("/youtube");

    return (
        <VideoContext.Provider value={[videoPlayer, dispatchVideoPlayer]}>
            {routes}
        </VideoContext.Provider>
    );
};

export default YoutubeProvider;