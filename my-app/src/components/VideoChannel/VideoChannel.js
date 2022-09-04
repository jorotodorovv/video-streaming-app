import { Grid } from "@mui/material";

import styles from './VideoChannel.module.css'

import CircularImage from "../base/CircularImage/CircularImage"

const VideoChannel = (props) => {
    let selectedClass = props.selected ? styles.v_channel_selected : null;

    return (
        <Grid item xs={1}>
            <CircularImage className={selectedClass} image={props.image} height={80} width={80} />
        </Grid>
    );
};

export default VideoChannel;