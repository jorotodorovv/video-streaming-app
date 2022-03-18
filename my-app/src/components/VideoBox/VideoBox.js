import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import VideoPlayer from '../VideoPlayer/VideoPlayer';

import styles from './VideoBox.module.css'

const VideoBox = (props) => {
    let media = {
        link: `/youtube/videos/${props.id}`,
    };

    if (props.load) {
        media.content = <VideoPlayer id={props.id} seconds={props.seconds} />;
        media.className = styles.v_card_content_scale;
    }
    else {
        media.content = <CardMedia component="img" image={props.image} alt={props.id} />;

        if (props.isPlaying) {
            media.className = styles.v_card_content_overlay
        }
    }

    let content = (
        <Card className={media.className} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {media.content}
            <CardContent sx={{ flexGrow: 1 }}>
                {props.title}
                <Typography variant="body2" color="secondary">
                    Views: {props.views}
                </Typography>
            </CardContent>
        </Card>
    );

    return props.isPlaying ? content : <Link className={styles.v_card_link} to={media.link}>{content}</Link>;
};

export default VideoBox;