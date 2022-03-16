import { useCallback, useEffect, useState } from 'react';

import YoutubeRouter from '../Routers/YoutubeRouter';

import YoutubeApi from '../../api/youtube/youtube.ts';
import ProviderConfigurations from '../../api/youtube/config.ts';
import VideoProvider from '../../context/video-context';

const YoutubeProvider = () => {
    const [videoConfig, setVideoConfig] = useState();

    const initProvider = async () => {
        let config = new ProviderConfigurations("/configs/youtube.json");
        await config.init();

        setVideoConfig(config);
    };

    useEffect(() => {
        initProvider();
    }, []);

    const api = useCallback((parameters) => {
        if (videoConfig) {
            return new YoutubeApi(
                videoConfig,
                parameters);
        }
    }, [videoConfig])

    let dependencies = { api };

    return (
        <VideoProvider>
            <YoutubeRouter dependencies={dependencies} />
        </VideoProvider>
    );
};

export default YoutubeProvider;