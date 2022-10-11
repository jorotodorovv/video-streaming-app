import { useCallback, useContext } from "react"

import { CircularProgress } from "@mui/material";

import Observer from "../../../hoc/Observer";
import VideoCard from "../../../components/VideoCard/VideoCard";

import { VideoContext } from "../../../context/video-context";
import Cache from '../../../helpers/basic/Cache.ts'

import styles from './VideoCollection.module.css'

const INITIAL_VIDEO_TOKEN = "default";
const END_VIDEO_TOKEN = "end";

const VIDEO_COLLECTION_CACHE_KEY = "youtube_vids";

const VideoCollection = (props) => {
    const { videoPlayer, renderVideos } = useContext(VideoContext);

    let cache = new Cache(VIDEO_COLLECTION_CACHE_KEY);

    const fetchVideos = useCallback(async () => {
        if (props.api && videoPlayer.token != END_VIDEO_TOKEN) {
            let tokenKey = videoPlayer.token ?? INITIAL_VIDEO_TOKEN;

            if (props.currentChannel) {
                tokenKey += `_${props.currentChannel}`;
            }

            let response = await cache.receive(tokenKey, getVideos);

            let token = response.token !== videoPlayer.token ?
                response.token : END_VIDEO_TOKEN;

            renderVideos(response.videos, token);
        }
    }, [videoPlayer.token, props.currentChannel, props.api]);

    const getVideos = async () => {
        let videos = [];
        let response;

        if (!props.currentChannel) {
            response = await props.api.getVideos(videoPlayer.token);
            videos = response.videos;
        }
        else {
            let channelPlaylist = await props.api.getPlaylists(props.currentChannel);

            if (channelPlaylist) {
                response = await props.api.getPlaylistVideos(channelPlaylist[0].id);

                for (let item of response.items) {
                    let itemId = item.contentDetails.videoId;
                    let video = await props.api.getVideo(itemId, videoPlayer.token);

                    if (video) {
                        videos.push(video);
                    }
                }
            }
        }

        return { videos, token: response?.token };
    };

    let data = Object.values(videoPlayer.videos).map(v =>
        <VideoCard
            id={v.video.id}
            key={"video_card_" + v.video.id}
            token={v.video.token}
            title={v.video.title.substring(30)}
            description={v.video.description.substring(100)}
            seconds={v.seconds}
            playbackID={videoPlayer.playbackVideoID}
            image={v.video.image}
            views={v.video.views}>
        </VideoCard>
    );

    let loadingBar = videoPlayer.token && videoPlayer.token !== END_VIDEO_TOKEN ?
        <CircularProgress key={"loading_bar"} sx={{ mx: "auto", my: 10 }} color="secondary" /> : null;

    return <div className={styles.v_collection}>
        {data}
        <Observer callback={fetchVideos} state={[videoPlayer.videos]} />
        {loadingBar}
    </div>
};

export default VideoCollection;