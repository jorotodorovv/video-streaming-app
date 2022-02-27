import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css'
import Frame from '../base/Frame';
import { YoutubeEmbeded } from '../../api/youtube.ts';
import { useState } from 'react';

const VideoCard = (props) => {
    const [loadVideo, setLoadVideo] = useState(false);
    const [videoTimeout, setVideoTimeout] = useState();

    let classes = [styles.v_card];

    let media;

    if (loadVideo) {
        const embed = new YoutubeEmbeded(props.id);
        const url = embed.exportUrl();

        media = <Frame width="100%" height="100%" src={url} />;

        classes.push(styles.v_card_scale);
    }
    else {
        media = <CardMedia component="img" image={props.image.url} alt={props.id} />;
    }

    const hoverHandler = (hasHover) => {
        if (hasHover) {
            let timeout = setTimeout(() => {
                setLoadVideo(true)
            }, 1000);

            setVideoTimeout(timeout);
        }
        else {
            if (videoTimeout) {
                clearTimeout(videoTimeout);
            }

            setLoadVideo(false);
        }
    }

    return (
        <Grid
            onMouseEnter={() => hoverHandler(true)}
            onMouseLeave={() => hoverHandler(false)}
            className={classes.join(" ")}
            item key={props.id} xs={12} sm={4} md={3}>
            <Link to={`/videos/${props.id}`}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {media}
                    <CardContent sx={{ flexGrow: 1 }}>
                        {props.title}
                        <Typography variant="body2" color="secondary">
                            Views: {props.views}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
};

export default VideoCard;