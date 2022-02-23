import { useEffect, useRef, useState, useCallback } from "react"
import { getVideos } from "../../api/youtube/videos"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import Text from "../../helpers/basic/Text";
import Observer from "../../helpers/dom/Observer";

const VIDEOS_PER_REQUEST = 18;
const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 100;

const VideoCollection = () => {
    const collectionRef = useRef();

    const [videoData, setVideoData] = useState({ videos: [] });

    const fetchVideos = useCallback(async () => {
        let response = await getVideos(videoData.token, VIDEOS_PER_REQUEST);

        let newVideos = response.items.map(i => {
            let title = new Text(i.snippet.title);
            let description = new Text(i.snippet.description);

            return {
                id: i.id,
                title: title.substring(MAX_TITLE_LENGTH),
                description: description.substring(MAX_DESCRIPTION_LENGTH),
                image: i.snippet.thumbnails.high.url
            };
        });

        let videos = [...videoData.videos];

        for (let vid of newVideos) {
            videos.push(vid);
        }

        setVideoData({ videos, token: response.nextPageToken });
    }, [videoData]);

    useEffect(() => {
        const observer = new Observer(collectionRef, fetchVideos);
        observer.observe();

        return () => observer.unobserve();
    }, [videoData])

    let data = videoData.videos.map(v => (
        <Grid item key={v.id} xs={12} sm={4} md={2}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia component="img" image={v.image} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                        {v.title}
                    </Typography>
                    <Typography>
                        {v.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    ));

    return (
        <Grid container spacing={4}>
            {data}
            <Box ref={collectionRef}>
            </Box>
            <CircularProgress sx={{ mx: "auto", my: 10 }} color="secondary" />
        </Grid>
    );
}

export default VideoCollection;