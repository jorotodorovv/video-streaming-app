import { Link } from 'react-router-dom';

import VideoPlayer from '../VideoPlayer/VideoPlayer';

import styles from './VideoBox.module.css'

const VideoBox = (props) => {
    let media = {
        link: `/youtube/videos/${props.token}/${props.id}`,
    };

    if (props.load) {
        media.content = <VideoPlayer id={props.id} seconds={props.seconds} />;
        media.className = styles.v_card_content_scale;
    }
    else {
        media.content = <img width={300} src={props.image} alt={props.id} />;

        if (props.isPlaying) {
            media.className = styles.v_card_content_overlay
        }
    }

    let card = <div className={media.className}>
        {media.content}
        <div className={styles.v_card_content_text}>
            <p>{props.title}</p>
            <p>Views: {props.views}</p>
        </div>
    </div>

    return props.isPlaying ? card :
        <Link className={styles.v_card_link} to={media.link}>{card}</Link>
};

export default VideoBox;