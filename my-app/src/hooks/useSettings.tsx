import { useContext, useEffect } from 'react';

import { SettingsContext } from '../context/settings-context';

import config from '../api/youtube.config.json';

const useSettings = () => {
    const { videoSettings, changeSettings } = useContext(SettingsContext);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        changeSettings(state => config);
    };

    return videoSettings;
};

export default useSettings;