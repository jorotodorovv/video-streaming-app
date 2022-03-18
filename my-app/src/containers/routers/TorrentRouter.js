import Home from '../pages/torrent/Home';
import BaseRouter from './BaseRouter';

const TorrentRouter = (props) => {
    const paths = {
        index: props.index,
        containers: [
            { Page: Home, path: props.index },
        ],
    };

    return <BaseRouter
        main={paths.index}
        containers={paths.containers}
        dependencies={props.dependencies} />
};

export default TorrentRouter;