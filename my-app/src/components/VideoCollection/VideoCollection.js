import { useState, useCallback, useMemo } from "react"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

import YoutubeVideosApi, { INITIAL_TOKEN_VALUE } from "../../api/youtube.ts";

const VideoCollection = () => {
    const [collectionData, setCollectionData] =
        useState({ videos: [], token: INITIAL_TOKEN_VALUE });

    const api = useMemo(() => {
        return new YoutubeVideosApi({
            videosPerRequest: 4,
            maxTitleLength: 30,
            maxDescriptionLength: 100
        });
    }, []);

    const fetchVideos = useCallback(async () => {
        let response = await api.getVideos(collectionData.token);

        let videos = [...collectionData.videos];

        for (let vid of response.videos) {
            videos.push(vid);
        }

        setCollectionData({ videos, token: response.token });
    }, [collectionData]);

    let data = collectionData.videos.map(v =>
        <VideoCard
            id={v.id}
            title={v.title}
            description={v.description}
            image={v.image}
            views={v.views}>
        </VideoCard>
    );

    let loadingBar = collectionData.token ?
        <CircularProgress sx={{ mx: "auto", my: 10 }} color="secondary" /> : null;

    return (
        <Grid container spacing={4}>
            {data}
            <Observer callback={fetchVideos} state={[collectionData]} />
            {loadingBar}
        </Grid>
    );
}

export default VideoCollection;