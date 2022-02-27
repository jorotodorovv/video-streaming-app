import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css'

const VideoCard = (props) => {
    return (
        <Grid className={styles.v_card_scale_up} item key={props.id} xs={12} sm={4} md={2}>
            <Link to={`/videos/${props.id}`}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia component="img" image={props.image} alt="random" />
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