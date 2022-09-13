import { useCallback, useEffect, useState } from 'react';

import YoutubeRouter from '../routers/YoutubeRouter';

import YoutubeApi from '../../api/youtube/youtube.ts';
import ProviderConfigurations from '../../api/youtube/config.ts';
import VideoProvider from '../../context/video-context';

const YoutubeProvider = (props) => {
    const [videoConfig, setVideoConfig] = useState();

    useEffect(() => {
        initProvider();
    }, []);

    const initProvider = async () => {
        let config = new ProviderConfigurations(props.configPath);
        await config.init();

        setVideoConfig(config);
    };

    const api = useCallback((parameters) => {
        if (videoConfig) {
            return new YoutubeApi(
                videoConfig,
                parameters);
        }
    }, [videoConfig]);

    const client = useCallback((callback) => {
        if (videoConfig && window.google) {
            return window.google.accounts.oauth2.initTokenClient({
                client_id: videoConfig.clientId,
                scope: videoConfig.scope,
                callback
            });
        }
    }, [videoConfig, window.google]);

    return (
        <VideoProvider>
            <YoutubeRouter
                config={videoConfig}
                dependencies={{ api, client }} />
        </VideoProvider>
    );
};

export default YoutubeProvider;