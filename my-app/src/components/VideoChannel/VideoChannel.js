import { Grid } from "@mui/material";

import Wrapper from "../../hoc/Wrapper";

import CircularImage from "../base/CircularImage/CircularImage"

import styles from './VideoChannel.module.css'

const VideoChannel = (props) => {
    const classes = [styles.v_channel];

    if (props.selectedChannelId === props.channelId) {
        classes.push(styles.v_channel_selected);
    }

    const onSelectChannel = props.onSelectChannel.bind(this, props.channelId);

    return (
        <Wrapper onClick={onSelectChannel}>
            <Grid item xs={1}>
                <CircularImage className={classes.join(' ')} image={props.image} height={80} width={80} />
            </Grid>
        </Wrapper>
    );
};

export default VideoChannel;