import { useContext, useEffect } from 'react';

import File from '../helpers/basic/File'

import { SettingsContext } from '../context/settings-context';

import ProviderConfigurations from '../api/youtube/config';

const useSettings = (configPath) => {
    const { videoSettings, changeSettings } = useContext(SettingsContext);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        let file = new File<ProviderConfigurations>(configPath);
        let config = await file.export();

        changeSettings(state => config);
    };

    return videoSettings;
};

export default useSettings;