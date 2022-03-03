import styles from './VideoPlayback.module.css'

import VideoContent from '../../components/VideoContent/VideoContent';

import { useContext } from 'react';
import VideoContext from '../../context/VideoContext';
import { Grid } from '@mui/material';

const VideoPlayback = () => {
    const [videoData] = useContext(VideoContext);

    let modal = null;

    if (videoData.video && videoData.video.image) {
        modal = (
            <Grid item md={3} className={styles.v_playback}>
                <VideoContent
                    id={videoData.video.id}
                    title={videoData.video.title}
                    description={videoData.video.description}
                    image={videoData.video.image}
                    load={true}
                    seconds={videoData.seconds}
                    views={videoData.video.views}
                />
            </Grid>
        );
    }

    return modal;
}

export default VideoPlayback;