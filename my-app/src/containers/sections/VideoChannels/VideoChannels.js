import { useEffect, useState, useContext } from "react"

import Grid from '@mui/material/Grid';

import { VideoContext } from "../../../context/video-context";

import VideoChannel from "../../../components/VideoChannel/VideoChannel";

import styles from './VideoChannels.module.css';

const VideoChannels = (props) => {
    const [channels, setChannels] = useState([]);

    const { gToken } = useContext(VideoContext);

    useEffect(() => {
        if (props.googleClient && !gToken) {
            props.googleClient.requestAccessToken();
        }
    }, [props.googleClient]);

    useEffect(async () => {
        if (props.api && gToken) {
            await fetchChannels(props.api, gToken);
        }
    }, [props.api, gToken]);

    const fetchChannels = async (api, token) => {
        let channels = await api.getSubscriptions(token);
        setChannels(channels);
    };

    let videoChannels = channels.map(c =>
        <VideoChannel
            key={"video_channel_" + c.id}
            selectedChannelId={props.currentChannel}
            channelId={c.snippet.resourceId.channelId}
            onSelectChannel={props.onSelectChannel}
            image={c.snippet.thumbnails.default.url} />
    );

    return (<Grid className={styles.v_channel_section} container spacing={props.spacing}>
        {videoChannels}
    </Grid>);
};

export default VideoChannels;