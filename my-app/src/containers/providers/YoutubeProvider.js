import YoutubeRouter from '../routers/YoutubeRouter';
import VideoProvider from '../../context/video-context';

const YoutubeProvider = () => {
    const CONFIG_PATH = "/configs/youtube.json";

    return (
        <VideoProvider>
            <YoutubeRouter configPath={CONFIG_PATH} />
        </VideoProvider>
    );
};

export default YoutubeProvider;