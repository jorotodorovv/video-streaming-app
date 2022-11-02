import { useEffect, useState } from 'react';

import BaseRouter from './BaseRouter';

import Home from '../pages/youtube/Home'
import Video from '../pages/youtube/Video'

import useYT from '../../youtube/useYT';
import useSettings from '../../hooks/useSettings';

interface ProviderPaths {
    index: string,
    containers: any[]
}

const YoutubeRouter = (props) => {
    const [paths, setPaths] = useState<ProviderPaths>();

    const videoSettings = useSettings();
    const { client } = useYT(videoSettings);

    useEffect(() => {
        if (videoSettings) {
            initPaths();
        }
    }, [videoSettings]);

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