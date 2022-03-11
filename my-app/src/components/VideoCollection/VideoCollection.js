import { useCallback, useMemo, useContext } from "react"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

import YoutubeVideosApi from "../../api/youtube.ts";
import VideoContext from "../../context/VideoContext";

const VideoCollection = () => {
    const [videoProvider, setVideoProvider] = useContext(VideoContext);

    const api = useMemo(() => {
        return new YoutubeVideosApi({
            videosPerRequest: 4,
            maxTitleLength: 30,
            maxDescriptionLength: 100
        });
    }, []);

    const fetchVideos = useCallback(async () => {
        let response = await api.getVideos(videoProvider.token);

        let provider = { ...videoProvider, token: response.token };

        for (let video of response.videos) {
            provider.videos[video.id] = { video };
        }

        setVideoProvider(provider);
    }, [videoProvider]);

    let data = Object.values(videoProvider.videos).map(v =>
        <VideoCard
            id={v.video.id}
            key={"video_card_" + v.video.id}
            title={v.video.title}
            description={v.video.description}
            seconds={v.seconds}
            hasPlayback={false}
            image={v.video.image}
            views={v.video.views}>
        </VideoCard>
    );

    let loadingBar = videoProvider.token ?
        <CircularProgress sx={{ mx: "auto", my: 10 }} color="secondary" /> : null;

    return (
        <Grid container spacing={4}>
            {data}
            <Observer callback={fetchVideos} state={[videoProvider]} />
            {loadingBar}
        </Grid>
    );
}

export default VideoCollection;