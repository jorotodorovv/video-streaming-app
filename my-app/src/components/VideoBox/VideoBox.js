import { Link } from 'react-router-dom';
import Renderer from '../../hoc/Renderer';

import VideoPlayer from '../VideoPlayer/VideoPlayer';

import styles from './VideoBox.module.css'

const VideoBox = (props) => {
    let link = `/youtube/videos/${props.token}/${props.id}`;

    if (props.load) {
        return <div className={styles.v_card_content_scale}>
            <VideoPlayer id={props.id} seconds={props.seconds} width="300px" height="200px" />
        </div>;
    }

    let overlayClass = props.isPlaying ? styles.v_card_content_overlay : null;

    let content =
        <div className={overlayClass}>
            <img width={300} src={props.image} alt={props.id} />
            <div className={styles.v_card_content_text}>
                <p>{props.title}</p>
                <p>Views: {props.views}</p>
            </div>
        </div>;

    return props.isPlaying ?
        content :
        <Link className={styles.v_card_link} to={link}>
            <Renderer
                loadingClass={styles.v_card_loading}
                loadedClass={styles.v_card_loaded}>
                {content}
            </Renderer>
        </Link >
};

export default VideoBox;