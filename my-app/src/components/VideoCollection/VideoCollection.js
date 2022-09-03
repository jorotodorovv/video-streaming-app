import { useCallback, useMemo, useContext, useEffect } from "react"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

import { VideoContext } from "../../context/video-context";
import Cache from '../../helpers/basic/Cache.ts'

const INITIAL_VIDEO_TOKEN = "default";
const VIDEO_COLLECTION_CACHE_KEY = "youtube_vid_col";

const VideoCollection = (props) => {
    var cache = new Cache(VIDEO_COLLECTION_CACHE_KEY);

    const { videoPlayer, renderVideos } = useContext(VideoContext);

    const fetchVideos = useCallback(async () => {
        if (props.api) {
            let response = await cache.receive(
                videoPlayer.token ?? INITIAL_VIDEO_TOKEN, getVideos);

            renderVideos(response.videos, response.token);
        }
    }, [videoPlayer.token, props.api]);

    const getVideos = async () => {
        return await props.api.getVideos(videoPlayer.token);
    }

    let data = Object.values(videoPlayer.videos).map(v =>
        <VideoCard
            id={v.video.id}
            key={"video_card_" + v.video.id}
            title={v.video.title}
            description={v.video.description}
            seconds={v.seconds}
            playbackID={videoPlayer.playbackVideoID}
            image={v.video.image}
            views={v.video.views}>
        </VideoCard>
    );

    let loadingBar = videoPlayer.token ?
        <CircularProgress sx={{ mx: "auto", my: 10 }} color="secondary" /> : null;

    return (
        <Grid container spacing={4}>
            {data}
            <Observer callback={fetchVideos} state={[videoPlayer]} />
            {loadingBar}
        </Grid>
    );
}

export default VideoCollection;