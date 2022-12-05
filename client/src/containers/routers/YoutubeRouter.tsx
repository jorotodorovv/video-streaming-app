import { useContext, useEffect, useState } from 'react';

import BaseRouter from './BaseRouter';
import { VideoContext } from '../../context/video-context';

import Home from '../pages/youtube/Home'
import Video from '../pages/youtube/Video'

import useYT from '../../youtube/useYT';

import { config, getEndpoint } from '../../../src/helpers/routes/endpoints';

interface ProviderPaths {
    index: string,
    containers: any[]
}

const YoutubeRouter = (props) => {
    const [paths, setPaths] = useState<ProviderPaths>();
    const { videoSettings, setSettings } = useContext<any>(VideoContext)
  
    useEffect(() => {
        getSettings();
    }, []);
    
    useEffect(() => {
        if (videoSettings) {
            initPaths();
        }
    }, [videoSettings]);

    const getSettings = async () => {
        let endpoint = getEndpoint(config.settings);

        let settings = await fetch(endpoint)
            .then((response) => {
                return response.json();
            });

        setSettings(settings);
    };

    const { client } = useYT(videoSettings);

    const initPaths = () => {
        setPaths({
            index: videoSettings.index,
            containers: [
                { Page: Home, path: videoSettings.index },
                { Page: Video, path: `${videoSettings.index}/videos/:token/:id` },
            ],
        });
    };

    if (!paths) {
        return null;
    }

    return <BaseRouter
        index={paths.index}
        containers={paths.containers}
        dependencies={{ client }} />
};

export default YoutubeRouter;