import YoutubeRouter from '../routers/YoutubeRouter';
import VideoProvider from '../../context/video-context';

const YoutubeProvider = () => {
    return (
        <VideoProvider>
            <YoutubeRouter/>
        </VideoProvider>
    );
};

export default YoutubeProvider;