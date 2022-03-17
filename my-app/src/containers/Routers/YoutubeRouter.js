import Home from '../Home/Home'
import Video from '../Video/Video'

import BaseRouter from './BaseRouter';

const paths = {
    index: "/youtube",
    containers: [
        { Page: Home, path: "/youtube" },
        { Page: Video, path: "/youtube/videos/:id" },
    ],
};

const YoutubeRouter = (props) => {

    return <BaseRouter
        main={paths.index}
        containers={paths.containers}
        dependencies={props.dependencies} />
};

export default YoutubeRouter;