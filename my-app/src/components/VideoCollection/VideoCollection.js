import { useState, useCallback, useMemo } from "react"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';

import Text from "../../helpers/basic/Text.ts";

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

import YoutubeVideosApi from "../../api/youtube/videos.ts";

const VideoCollection = () => {
    const [videoData, setVideoData] = useState({ videos: [] });

    const api = useMemo(() => {
        return new YoutubeVideosApi({
            videosPerRequest: 18,
            maxTitleLength: 30,
            maxDescriptionLength: 100
        });
    }, []);

    const fetchVideos = useCallback(async () => {
        let response = await api.getVideos(videoData.token);

        let newVideos = response.items.map(i => {
            let title = new Text(i.snippet.title);
            let description = new Text(i.snippet.description);

            return {
                id: i.id,
                title: title.substring(30),
                description: description.substring(100),
                image: i.snippet.thumbnails.high.url
            };
        });

        let videos = [...videoData.videos];

        for (let vid of newVideos) {
            videos.push(vid);
        }

        setVideoData({ videos, token: response.nextPageToken });
    }, [videoData]);

    let data = videoData.videos.map(v =>
        <VideoCard id={v.id} title={v.title} description={v.description} image={v.image}>
        </VideoCard>
    );

    return (
        <Grid container spacing={4}>
            {data}
            <Observer callback={fetchVideos} state={[videoData]} />
            <CircularProgress sx={{ mx: "auto", my: 10 }} color="secondary" />
        </Grid>
    );
}

export default VideoCollection;