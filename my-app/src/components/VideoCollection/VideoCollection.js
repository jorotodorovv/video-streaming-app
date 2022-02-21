import { useEffect, useRef, useState, useCallback } from "react"
import { getVideos } from "../../api/youtube/videos"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

const VideoCollection = () => {
    const collectionRef = useRef();

    const [videoData, setVideoData] = useState({ videos: [] });
    const [isLoading, setLoading] = useState(false);

    const fetchVideos = useCallback(async () => {
        let response = await getVideos(videoData.token, 18);

        let newVideos = response.items.map(i => {
            let title =
                i.snippet.title.substring(0, 30) +
                (i.snippet.description.length > 30 ? "..." : "");

            let description =
                i.snippet.description.substring(0, 100) +
                (i.snippet.description.length > 100 ? "..." : "");

            return {
                id: i.id,
                title,
                description,
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
        if (isLoading) return;

        var observer = new IntersectionObserver(
            function (entries) {
                if (entries[0].isIntersecting) {
                    //setLoading(true);
                    fetchVideos();
                    //setLoading(false);
                }
            }, { threshold: [0] });

        observer.observe(collectionRef.current);

        return () => {
            observer.unobserve(collectionRef.current);
        }
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
            <CircularProgress sx={{ mx: "auto", my: 10  }} color="secondary" />
        </Grid>
    );
}

export default VideoCollection;