import { useEffect, useState } from 'react';

import Home from '../pages/Home/Home'
import Video from '../pages/Video/Video'

import BaseRouter from './BaseRouter';

const YoutubeRouter = (props) => {
    const [paths, setPaths] = useState({});

    useEffect(() => {
        if (props.config) {
            initPaths();
        }
    }, [props.config]);

    const initPaths = () => {
        setPaths({
            index: props.config.index,
            containers: [
                { Page: Home, path: props.config.index },
                { Page: Video, path: `${props.config.index}/videos/:token/:id` },
            ],
        });
    };

    return <BaseRouter
        index={paths.index}
        containers={paths.containers}
        dependencies={props.dependencies} />
};

export default YoutubeRouter;