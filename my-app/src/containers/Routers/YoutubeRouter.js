import Home from '../Home/Home'
import Video from '../Video/Video'

import BaseRouter from './BaseRouter';

const YoutubeRouter = (props) => {
    const containers = [
        { Page: Home, path: "/youtube" },
        { Page: Video, path: "/youtube/videos/:id" },
    ];

    return <BaseRouter
        indexPath="/youtube"
        containers={containers}
        dependencies={props.dependencies} />
};

export default YoutubeRouter;