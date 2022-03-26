import { useCallback, useMemo, useContext, useEffect, useState } from "react"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

import { VideoContext } from "../../context/video-context";
import VideoChannel from "../VideoChannel/VideoChannel";
import Wrapper from "../../hoc/Wrapper";

const VideoCollection = (props) => {
    const { videoPlayer, renderVideos } = useContext(VideoContext);
    const [channel, setChannel] = useState();

    const fetchVideos = useCallback(async () => {
        if (props.api) {
            let ch = await props.api.getChannel("thehungrypartier");
            let vids = await props.api.getVideosByChannel(ch.id);
            let response = await props.api.getVideos(videoPlayer.token);

            setChannel(ch);
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
            playbackID={videoPlayer.playbackVideoID}
            image={v.video.image}
            views={v.video.views}>
        </VideoCard>
    );

    let loadingBar = videoPlayer.token ?
        <CircularProgress sx={{ mx: "auto", my: 10 }} color="secondary" /> : null;

    let ch = channel ? <VideoChannel image={channel.snippet.thumbnails.default.url} /> : null;

    return (
        <Wrapper>
            <Grid container spacing={2}>
                {ch}
            </Grid>
            <Grid container spacing={4}>
                {data}
                <Observer callback={fetchVideos} state={[videoPlayer]} />
                {loadingBar}
            </Grid>
        </Wrapper>
    );
}

export default VideoCollection;