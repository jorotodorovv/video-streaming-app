import { useCallback, useEffect, useState } from 'react';

import useVideo from '../../hooks/useVideo';
import VideoContext from '../../context/VideoContext'
import YoutubeRouter from '../Routers/YoutubeRouter';

import YoutubeApi from '../../api/youtube/youtube.ts';
import ProviderConfigurations from '../../api/youtube/config.ts';

const YoutubeProvider = () => {
    const [videoPlayer, dispatchVideoPlayer] = useVideo({ videos: {} })
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
        <VideoContext.Provider value={[videoPlayer, dispatchVideoPlayer]}>
            <YoutubeRouter dependencies={dependencies} />
        </VideoContext.Provider>
    );
};

export default YoutubeProvider;