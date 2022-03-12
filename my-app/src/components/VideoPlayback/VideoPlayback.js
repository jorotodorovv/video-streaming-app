import styles from './VideoPlayback.module.css'

import VideoContent from '../../components/VideoContent/VideoContent';

import { useContext } from 'react';
import VideoContext from '../../context/VideoContext';
import { Grid } from '@mui/material';

const VideoPlayback = () => {
    const [videoProvider] = useContext(VideoContext);

    let playback = null;

    if (videoProvider.playbackVideoId) {
        let player = videoProvider.videos[videoProvider.playbackVideoId];

        playback = (
            <Grid item md={3} className={styles.v_playback}>
                <VideoContent
                    id={player.video.id}
                    title={player.video.title}
                    description={player.video.description}
                    image={player.video.image}
                    load={true}
                    seconds={player.seconds}
                    views={player.video.views}
                />
            </Grid>
        );
    }

    return playback;
}

export default VideoPlayback;