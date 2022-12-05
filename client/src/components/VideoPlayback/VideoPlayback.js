import { useContext } from 'react';
import { VideoContext } from '../../context/video-context';

import CloseIcon from '@mui/icons-material/Close';

import Wrapper from '../../hoc/Wrapper';
import VideoBox from '../../components/VideoBox/VideoBox';

import styles from './VideoPlayback.module.css'

const VideoPlayback = (props) => {
    const { videoPlayer, removePlayback } = useContext(VideoContext);

    const onClose = () => {
        removePlayback();
    };

    let id = videoPlayer.playbackVideoID;
    let player = videoPlayer.videos[id];

    let playback = player && player.seconds ?
        (
            <div className={styles.v_playback}>
                <CloseIcon className={styles.v_card_close} fontSize={'large'} onClick={onClose} />;
                <VideoBox
                    id={player.video.videoId}
                    title={player.video.title}
                    description={player.video.description}
                    frame={props.frame}
                    image={player.video.image}
                    seconds={player.seconds}
                    views={player.video.views}
                    load
                />
            </div>
        ) : null;

    return <Wrapper>{playback}</Wrapper>;

}

export default VideoPlayback;