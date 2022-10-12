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
        <Wrapper className={styles.v_channel_box} onClick={onSelectChannel}>
            <CircularImage className={classes.join(' ')} image={props.image} height={80} width={80} />
        </Wrapper>
    );
};

export default VideoChannel;