import { Grid } from "@mui/material";

import Wrapper from "../../hoc/Wrapper";

import CircularImage from "../base/CircularImage/CircularImage"

import styles from './VideoChannel.module.css'

const VideoChannel = (props) => {
    let selectedClass = props.selectedChannelId === props.channelId ? styles.v_channel_selected : null;

    const onSelectChannel = props.onSelectChannel.bind(this, props.channelId);

    return (
        <Wrapper onClick={onSelectChannel}>
            <Grid item xs={1}>
                <CircularImage className={selectedClass} image={props.image} height={80} width={80} />
            </Grid>
        </Wrapper>
    );
};

export default VideoChannel;