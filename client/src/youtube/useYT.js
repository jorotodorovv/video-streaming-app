import { useCallback } from 'react';

const useYT = (settings) => {
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
        client,
        settings,
    }
};

export default useYT;