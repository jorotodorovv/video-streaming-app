import { useRef, useState, useCallback } from "react"
import { getVideos } from "../../api/youtube/videos"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";

import Text from "../../helpers/basic/Text.ts";

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

const VIDEOS_PER_REQUEST = 18;
const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 100;

const VideoCollection = () => {
    const [videoData, setVideoData] = useState({ videos: [], tokens: [] });

    const fetchVideos = useCallback(async () => {
        let token = videoData.tokens[videoData.tokens.length - 1];
        let response = await getVideos(token, VIDEOS_PER_REQUEST);

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

        setVideoData({ videos, tokens: [...videoData.tokens, response.nextPageToken] });
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