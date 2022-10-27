import { useCallback } from 'react';

import YoutubeApi from './youtube.ts';

const useYT = (settings) => {
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