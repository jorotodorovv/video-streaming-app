import { useState } from 'react';

import Grid from '@mui/material/Grid';
import VideoBox from '../VideoBox/VideoBox'

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

    return (
        <Grid
            onMouseEnter={() => hoverHandler(!props.hasPlayback)}
            onMouseLeave={() => hoverHandler(false)}
            item key={props.id} xs={12} sm={4} md={3}>
            <VideoBox
                id={props.id}
                title={props.title}
                seconds={props.seconds}
                load={loadVideo}
                views={props.views}
                image={props.image.url}
            />
        </Grid>
    );
};

export default VideoCard;