import { useState } from 'react';

import VideoBox from '../VideoBox/VideoBox'

import Text from '../../helpers/basic/Text'

import styles from './VideoCard.module.css'

const VideoCard = (props) => {
    const [loadVideo, setLoadVideo] = useState(props.load);
    const [videoTimeout, setVideoTimeout] = useState();

    const onHover = () => {
        if (loadVideo || props.playbackID) {
            return;
        }

        let timeout = setTimeout(() => {
            setLoadVideo(state => true);
        }, 1000);

        setVideoTimeout(state => timeout);
    };

    const onLeave = () => {
        setLoadVideo(state => false);
        clearTimeout(videoTimeout);
    };

    let className = loadVideo ? styles.v_card_grid_scale : styles.v_card_grid;
    let title = new Text(props.title);

    return (
        <div
            className={className}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            key={props.id}>
            <VideoBox
                id={props.id}
                token={props.token}
                title={title.substring(30)}
                seconds={props.seconds}
                frame={props.frame}
                load={loadVideo}
                isPlaying={props.playbackID === props.id}
                views={props.views}
                image={props.image?.url}
            />
        </div>
    );
};

export default VideoCard;