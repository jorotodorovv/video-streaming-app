import { useState } from 'react';

import Grid from '@mui/material/Grid';
import VideoBox from '../VideoBox/VideoBox'

import styles from './VideoCard.module.css'

const VideoCard = (props) => {
    const [loadVideo, setLoadVideo] = useState(props.load);
    const [videoTimeout, setVideoTimeout] = useState();

    const hoverHandler = (hasHover) => {
        if (hasHover) {
            let timeout = setTimeout(() => {
                if (!loadVideo) {
                    setLoadVideo(!loadVideo)
                }
            }, 1000);

            setVideoTimeout(timeout);
        }
        else {
            if (videoTimeout) {
                clearTimeout(videoTimeout);
            }
            if (loadVideo) {
                setLoadVideo(!loadVideo);
            }
        }
    }

    let isPlaying = props.playbackID === props.id;
    let className = loadVideo ? styles.v_card_grid_scale : styles.v_card_grid;

    return (
        <Grid
            className={className}
            onMouseEnter={() => hoverHandler(!props.playbackID)}
            onMouseLeave={() => hoverHandler(false)}
            item key={props.id} xs={12} sm={4} md={3}>
            <VideoBox
                id={props.id}
                title={props.title}
                seconds={props.seconds}
                load={loadVideo}
                isPlaying={isPlaying}
                views={props.views}
                image={props.image.url}
            />
        </Grid>
    );
};

export default VideoCard;