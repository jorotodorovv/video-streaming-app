import { useCallback, useContext, useEffect, useState } from "react"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

import { VideoContext } from "../../context/video-context";
import Wrapper from "../../hoc/Wrapper";
import Cache from '../../helpers/basic/Cache.ts'
import VideoChannels from "../../containers/sections/VideoChannels/VideoChannels";

const INITIAL_VIDEO_TOKEN = "default";
const END_VIDEO_TOKEN = "end";

const VIDEO_COLLECTION_CACHE_KEY = "youtube_vids";

const VideoCollection = (props) => {
    const { videoPlayer, renderVideos, clearVideos } = useContext(VideoContext);

    const [currentChannel, setCurrentChannel] = useState();

    let cache = new Cache(VIDEO_COLLECTION_CACHE_KEY);

    const fetchVideos = useCallback(async () => {
        if (props.api && videoPlayer.token != END_VIDEO_TOKEN) {
            let tokenKey = videoPlayer.token ?? INITIAL_VIDEO_TOKEN;

            if (currentChannel) {
                tokenKey += `_${currentChannel}`;
            }

            let response = await cache.receive(tokenKey, getVideos);

            let token = response.token !== videoPlayer.token ?
                response.token : END_VIDEO_TOKEN;

            renderVideos(response.videos, token);
        }
    }, [videoPlayer.token, currentChannel, props.api]);

    const getVideos = async () => {
        let videos = [];
        let response;

        if (!currentChannel) {
            response = await props.api.getVideos(videoPlayer.token);
            videos = response.videos;
        }
        else {
            let channelPlaylist = await props.api.getPlaylists(currentChannel);

            response = await props.api.getPlaylistVideos(channelPlaylist[0].id);

            for (let item of response.items) {
                let itemId = item.contentDetails.videoId;
                let video = await props.api.getVideo(itemId, videoPlayer.token);

                if (video) {
                    videos.push(video);
                }
            }
        }

        return { videos, token: response.token };
    }

    const selectChannel = (id) => {
        if (currentChannel === id) return;

        setCurrentChannel(id);
        clearVideos();
    };

    let data = Object.values(videoPlayer.videos).map(v =>
        <VideoCard
            id={v.video.id}
            key={"video_card_" + v.video.id}
            token={v.video.token}
            title={v.video.title}
            description={v.video.description}
            seconds={v.seconds}
            playbackID={videoPlayer.playbackVideoID}
            image={v.video.image}
            views={v.video.views}>
        </VideoCard>
    );

    let loadingBar = videoPlayer.token && videoPlayer.token !== END_VIDEO_TOKEN ?
        <CircularProgress key={"loading_bar"} sx={{ mx: "auto", my: 10 }} color="secondary" /> : null;

    return (
        <Wrapper>
            <VideoChannels
                api={props.api}
                googleClient={props.googleClient}
                currentChannel={currentChannel}
                onSelectChannel={selectChannel}
                spacing={2} />
            <Grid container spacing={4}>
                {data}
                <Observer callback={fetchVideos} state={[videoPlayer]} />
                {loadingBar}
            </Grid>
        </Wrapper>
    );
}

export default VideoCollection;