import { useEffect, useState, useContext } from "react"

import { VideoContext } from "../../../context/video-context";

import VideoChannel from "../../../components/VideoChannel/VideoChannel";

import styles from './VideoChannels.module.css';

const VideoChannels = (props) => {
    const [channels, setChannels] = useState([]);

    const { gToken, clearVideos } = useContext(VideoContext);

    useEffect(() => {
        if (props.googleClient && !gToken) {
            props.googleClient.requestAccessToken();
        }
    }, [props.googleClient]);

    useEffect(() => {
        const renderChannels = async () => {
            if (props.api && gToken) {
                await fetchChannels(props.api, gToken);
            }
        };

        renderChannels();
    }, [props.api, gToken]);

    const fetchChannels = async (api, token) => {
        let channels = await api.getSubscriptions(token);
        setChannels(channels);
    };

    const selectChannel = (id) => {
        if (props.currentChannel === id) return;

        props.onSetCurrentChannel(id);
        clearVideos();
    };

    let videoChannels = channels.map(c =>
        <VideoChannel
            key={"video_channel_" + c.id}
            selectedChannelId={props.currentChannel}
            channelId={c.snippet.resourceId.channelId}
            onSelectChannel={selectChannel}
            image={c.snippet.thumbnails.default.url} />
    );

    return (
        <div className={styles.v_channel_section}>
            {videoChannels}
        </div>);
};

export default VideoChannels;