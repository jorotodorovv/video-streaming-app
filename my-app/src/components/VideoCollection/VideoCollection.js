import { useCallback, useMemo, useContext } from "react"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

import YoutubeVideosApi from "../../api/youtube.ts";
import VideoContext from "../../context/VideoContext";

const VideoCollection = () => {
    const [videoPlayer, dispatchVideoPlayer] = useContext(VideoContext);

    const api = useMemo(() => {
        return new YoutubeVideosApi({
            videosPerRequest: 4,
            maxTitleLength: 30,
            maxDescriptionLength: 100
        });
    }, []);

    const fetchVideos = useCallback(async () => {
        let response = await api.getVideos(videoPlayer.token);

        dispatchVideoPlayer({ type: "HOME", videos: response.videos, token: response.token });
    }, [videoPlayer]);

    let hasPlayback = videoPlayer.playbackVideoId;

    let data = Object.values(videoPlayer.videos).map(v =>
        <VideoCard
            id={v.video.id}
            key={"video_card_" + v.video.id}
            title={v.video.title}
            description={v.video.description}
            seconds={v.seconds}
            hasPlayback={hasPlayback}
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