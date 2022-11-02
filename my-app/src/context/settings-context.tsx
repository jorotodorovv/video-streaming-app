import { useState, createContext } from 'react'
import ProviderConfigurations from '../youtube/config';

const SettingsContext = createContext({
    videoSettings: new ProviderConfigurations(),
    changeSettings: (settings: any) => { },
});

const SettingsProvider = (props) => {
    const [videoSettings, setVideoSettings] = useState<ProviderConfigurations>();

    const changeSettings = (settings) => {
        setVideoSettings(settings);
    }

    const provider = {
        videoSettings,
        changeSettings,
    };

    return (
        <SettingsContext.Provider value={provider}>
            {props.children}
        </SettingsContext.Provider>
    );
};


export { SettingsContext };

export default SettingsProvider;