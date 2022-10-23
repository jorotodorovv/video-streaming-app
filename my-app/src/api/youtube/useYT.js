import { useCallback, useState, useEffect } from 'react';

import ProviderConfigurations from './config.ts';
import YoutubeApi from './youtube.ts';

const useYT = (configPath) => {
    const [settings, setSettings] = useState();

    useEffect(() => { init(); }, []);

    const init = async () => {
        let config = new ProviderConfigurations(configPath);
        await config.init();

        setSettings(config);
    };

    const api = useCallback((parameters) => {
        if (settings) {
            return new YoutubeApi(
                settings,
                parameters);
        }
    }, [settings]);

    const client = useCallback((callback) => {
        if (settings && window.google) {
            return window.google.accounts.oauth2.initTokenClient({
                client_id: settings.clientId,
                scope: settings.scope,
                callback
            });
        }
    }, [settings, window.google]);

    return {
        api,
        client,
        settings,
    }
};

export default useYT;