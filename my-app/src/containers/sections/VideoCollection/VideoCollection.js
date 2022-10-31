import { useCallback, useContext } from "react"

import { CircularProgress } from "@mui/material";

import Observer from "../../../hoc/Observer";

import { VideoContext } from "../../../context/video-context";
import { SettingsContext } from "../../../context/settings-context";

import Cache from '../../../helpers/basic/Cache.ts'

import VideoCard from "../../../components/VideoCard/VideoCard";
import styles from './VideoCollection.module.css'

const VideoCollection = (props) => {
    const { videoPlayer, renderVideos } = useContext(VideoContext);
    const { videoSettings } = useContext(SettingsContext);

    let cache = new Cache(props.collectionCacheKey);

    const fetchVideos = useCallback(async () => {
        let token = videoPlayer.token ?? videoSettings.params.initialToken;
        let tokenKey = !props.currentChannel ? token : `${token}_${props.currentChannel}`;

        let response = await cache.receive(tokenKey, getVideos, token);

        renderVideos(response.videos, response.token);
    }, [videoPlayer.token, props.currentChannel, props.api]);

    const getVideos = async (token) => {
        if (!props.currentChannel) {
            let response =
                await fetch(`http://localhost:3000/api/videos/${token}`)
                    .then((data) => data.json());

            let videos = response.videos.map(v => {
                return { ...v, token }
            });

            return { videos, token: response?.nextToken };
        }
        else {
            // let channelPlaylist = await props.api.getPlaylists(props.currentChannel);

            // if (channelPlaylist) {
            //     response = await props.api.getPlaylistVideos(channelPlaylist[0].id);

            //     for (let item of response.items) {
            //         let itemId = item.contentDetails.videoId;
            //         let video = await props.api.getVideo(itemId, videoPlayer.token);

            //         if (video) {
            //             videos.push(video);
            //         }
            //     }
            // }
        }
    };

    let data = Object.values(videoPlayer.videos).map(v =>
        <VideoCard
            id={v.video.videoId}
            key={"video_card_" + v.video.videoId}
            frame={props.frame}
            token={v.video.token}
            title={v.video.title}
            seconds={v.seconds}
            playbackID={videoPlayer.playbackVideoID}
            image={v.video.image}
            views={v.video.views}>
        </VideoCard>
    );

    let loadingBar = <CircularProgress key={"loading_bar"} sx={{ mx: "auto", my: 10 }} color="secondary" />;

    return <div className={styles.v_collection}>
        {data}
        <Observer callback={fetchVideos} state={[videoPlayer.videos]} />
        {loadingBar}
    </div>
};

export default VideoCollection;