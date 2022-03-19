import VideoProvider from '../../context/video-context';
import TorrentRouter from '../routers/TorrentRouter';
import WebTorrent from 'webtorrent';

const TorrentProvider = () => {
    const client = new WebTorrent();

    let dependencies = { client };

    return (
        <VideoProvider>
            <TorrentRouter index={"/torrent"} dependencies={dependencies} />
        </VideoProvider>
    );
};

export default TorrentProvider;