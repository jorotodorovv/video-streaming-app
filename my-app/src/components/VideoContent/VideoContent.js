import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import styles from './VideoContent.module.css'
import VideoFrame from '../VideoFrame/VideoFrame';

const VideoContent = (props) => {
    let media = {};

    if (props.load) {
        media.content = <VideoFrame id={props.id} seconds={props.seconds} />;
        media.className = styles.v_card_content_scale;
    }
    else {
        media.content = <CardMedia component="img" image={props.image} alt={props.id} />;
    }

    return (
        <Link className={styles.v_card_link} to={`/youtube/videos/${props.id}`}>
            <Card className={media.className} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {media.content}
                <CardContent sx={{ flexGrow: 1 }}>
                    {props.title}
                    <Typography variant="body2" color="secondary">
                        Views: {props.views}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default VideoContent;