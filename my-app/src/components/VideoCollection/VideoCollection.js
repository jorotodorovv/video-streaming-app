import { useCallback, useMemo, useContext, useEffect } from "react"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

import { VideoContext } from "../../context/video-context";

const VideoCollection = (props) => {
    const { videoPlayer, renderVideos } = useContext(VideoContext);

    const fetchVideos = useCallback(async () => {
        if (props.api) {
            let response = await props.api.getVideos(videoPlayer.token);

            renderVideos(response.videos, response.token);
        }
    }, [videoPlayer.token, props.api]);

    let data = Object.values(videoPlayer.videos).map(v =>
        <VideoCard
            id={v.video.id}
            key={"video_card_" + v.video.id}
            title={v.video.title}
            description={v.video.description}
            seconds={v.seconds}
            hasPlayback={videoPlayer.playbackVideoID}
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