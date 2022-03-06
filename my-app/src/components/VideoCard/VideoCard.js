import { useState } from 'react';

import Grid from '@mui/material/Grid';
import VideoContent from '../VideoContent/VideoContent'

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
            <VideoContent
                id={props.id}
                load={loadVideo}
                title={props.title}
                views={props.views}
                image={props.image.url}
            />
        </Grid>
    );
};

export default VideoCard;