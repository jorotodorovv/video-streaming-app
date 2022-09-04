import Home from '../pages/Home/Home'
import Video from '../pages/Video/Video'

import BaseRouter from './BaseRouter';

const YoutubeRouter = (props) => {
    const paths = {
        index: props.index,
        containers: [
            { Page: Home, path: props.index },
            { Page: Video, path: `${props.index}/videos/:token/:id` },
        ],
    };

    return <BaseRouter
        main={paths.index}
        containers={paths.containers}
        dependencies={props.dependencies} />
};

export default YoutubeRouter;