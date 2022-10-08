import { useState } from 'react';

import VideoBox from '../VideoBox/VideoBox'

import styles from './VideoCard.module.css'

const VideoCard = (props) => {
    const [loadVideo, setLoadVideo] = useState(props.load);
    const [videoTimeout, setVideoTimeout] = useState();

    const hoverHandler = (hasHover) => {
        if (hasHover) {
            let timeout = setTimeout(() => {
                if (!loadVideo) {
                    setLoadVideo(!loadVideo)
                }
            }, 1000);

            setVideoTimeout(timeout);
        }
        else {
            if (videoTimeout) {
                clearTimeout(videoTimeout);
            }
            if (loadVideo) {
                setLoadVideo(!loadVideo);
            }
        }
    }

    let isPlaying = props.playbackID === props.id;
    let className = loadVideo ? styles.v_card_grid_scale : styles.v_card_grid;

    return (
        <div
            className={className}
            onMouseEnter={() => hoverHandler(!props.playbackID)}
            onMouseLeave={() => hoverHandler(false)}
            key={props.id}>
            <VideoBox
                id={props.id}
                token={props.token}
                title={props.title}
                seconds={props.seconds}
                load={loadVideo}
                isPlaying={isPlaying}
                views={props.views}
                image={props.image?.url}
            />
        </div>
    );
};

export default VideoCard;