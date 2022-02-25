import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import styles from './VideoCard.module.css'

const VideoCard = (props) => {
    return (
        <Grid className={styles.v_card_scale_up} item key={props.id} xs={12} sm={4} md={2}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Link href={`/videos/${props.id}`}>
                    <CardMedia component="img" image={props.image} alt="random" />
                </Link>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Link href={`/videos/${props.id}`} variant="h5">
                        {props.title}
                    </Link>
                    <Typography>
                        {props.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default VideoCard;