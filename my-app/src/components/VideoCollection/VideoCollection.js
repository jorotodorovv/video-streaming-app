import { useCallback, useMemo, useContext, useEffect, useState } from "react"

import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid';

import Observer from "../../hoc/Observer";
import VideoCard from "../VideoCard/VideoCard";

import { VideoContext } from "../../context/video-context";
import VideoChannel from "../VideoChannel/VideoChannel";
import Wrapper from "../../hoc/Wrapper";
import Cache from '../../helpers/basic/Cache.ts'

const INITIAL_VIDEO_TOKEN = "default";
const END_VIDEO_TOKEN = "end";

const VIDEO_COLLECTION_CACHE_KEY = "youtube_vids";

const channelNames = ["thehungrypartier"];

const VideoCollection = (props) => {
    const { videoPlayer, renderVideos, clearVideos } = useContext(VideoContext);

    const [currentChannel, setCurrentChannel] = useState();
    const [channels, setChannels] = useState([]);

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

    const fetchChannels = async (props) => {
        let userChannels = [];

        for (let username of channelNames) {
            let userChannel = await props.api.getChannel(username);

            userChannels.push(userChannel);
        }

        setChannels(userChannels);
    };

    useEffect(async () => {
        if (props.api) {
            await fetchChannels(props);
        }
    }, [props.api]);

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

    let videoChannels = channels.map(c =>
        <Wrapper onClick={selectChannel.bind(null, c.id)}>
            <VideoChannel
                selected={currentChannel === c.id}
                key={"video_channel_" + c.id}
                image={c.snippet.thumbnails.default.url} />
        </Wrapper>
    );

    return (
        <Wrapper>
            <Grid container spacing={2}>
                {videoChannels}
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