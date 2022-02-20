import { useEffect, useRef, useState } from "react"
import { getVideos } from "../../api/youtube/videos"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const VideoCollection = () => {
    const collectionRef = useRef();

    const [videos, setVideos] = useState([]);
    const [pageToken, setPageToken] = useState();
    const [loadVideos, setLoadVideos] = useState(true);

    useEffect(()=> {
        const handleScroll = () => {
            let lastScrollY = window.scrollY;
    
            if (lastScrollY >= collectionRef.current.clientHeight) {
                setLoadVideos(true);
            }
        };

        window.addEventListener('scroll', handleScroll, true);
    });

    useEffect(async () => {
        if (!loadVideos) return;

        let response = await getVideos(pageToken);

        setPageToken(response.nextPageToken);

        let newVideos = response.items.map(i => {
            let description =
                i.snippet.description.substring(0, 100) +
                (i.snippet.description.length > 100 ? "..." : "");

            return {
                id: i.id,
                title: i.snippet.title,
                description,
                image: i.snippet.thumbnails.high.url
            };
        });

        let videoData = [...videos];

        for (let vid of newVideos) {
            videoData.push(vid);
        }

        setVideos(videoData)
        setLoadVideos(false);
    }, [loadVideos]);

    let data = videos.map(v => (
        <Grid item key={v.id} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{
                        pt: '56.25%',
                    }}
                    image={v.image}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
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
        <Grid inputRef={collectionRef} container spacing={4}>
            {data}
        </Grid>
    );
}

export default VideoCollection;