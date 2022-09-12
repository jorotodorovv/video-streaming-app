import { useCallback, useEffect, useState } from 'react';

import YoutubeRouter from '../routers/YoutubeRouter';

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
    }, [videoConfig]);

    const client = useCallback((callback) => {
        if (window.google) {
            return window.google.accounts.oauth2.initTokenClient({
                client_id: '545284710817-3cba0dmurvn7l65ih5iphb3u0ladu22j.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/youtube.readonly',
                callback
            });
        }
    }, [window.google]);

    let dependencies = { api, client };

    return (
        <VideoProvider>
            <YoutubeRouter index={"/youtube"} dependencies={dependencies} />
        </VideoProvider>
    );
};

export default YoutubeProvider;