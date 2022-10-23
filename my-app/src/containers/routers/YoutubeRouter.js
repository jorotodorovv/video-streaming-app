import { useContext, useEffect, useState } from 'react';

import BaseRouter from './BaseRouter';

import Home from '../pages/Home/Home'
import Video from '../pages/Video/Video'

import { VideoContext } from '../../context/video-context';
import useYT from '../../api/youtube/useYT';

const YoutubeRouter = (props) => {
    const { setVideoSettings } = useContext(VideoContext);

    const [paths, setPaths] = useState({});
    
    const { api, client, settings } = useYT(props.configPath);

    useEffect(() => {
        if (settings) {
            init();
        }
    }, [settings]);

    const init = () => {
        setPaths({
            index: settings.index,
            containers: [
                { Page: Home, path: settings.index },
                { Page: Video, path: `${settings.index}/videos/:token/:id` },
            ],
        });

        setVideoSettings(state => settings);
    };

    return <BaseRouter
        index={paths.index}
        containers={paths.containers}
        dependencies={{ api, client }} />
};

export default YoutubeRouter;