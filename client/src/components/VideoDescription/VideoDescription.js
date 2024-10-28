import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share, Flag } from 'lucide-react';

import Accordion from '../base/Accordion/Accordion';
import VideoParagraph from "../VideoParagraph/VideoParagraph";
import VideoShare from '../VideoShare/VideoShare';

import styles from './VideoDescription.module.css';

const DESCRIPTION_PARAGRAPH_SEPARATOR = "\n";

const VideoDescription = (props) => {
    const [showShare, setShowShare] = useState(false);

    let description = null;

    let index = 0;

    if (props.description) {
        description = props.description.split(DESCRIPTION_PARAGRAPH_SEPARATOR)
            .map(p => <VideoParagraph
                key={"video_paragraph_" + props.id + `_${index++}`}
                text={p}
                onChangeTime={props.onChangeTime} />);
    }

    return <>
        <Accordion
            title={props.title}
            buttonClass={styles.v_description_button}
            panelClass={styles.v_description_panel}
            activeClass={styles.active}>
            {description}
        </Accordion>
        <div className={styles.v_actionButton_panel}>
            <button className={styles.v_actionButton}>
                <ThumbsUp className="w-5 h-5" />
                <span>{props.likes}</span>
            </button>
            <button className={styles.v_actionButton}>
                <ThumbsDown className="w-5 h-5" />
            </button>
            <button
                className={styles.v_actionButton}
                onClick={() => setShowShare(true)}>
                <Share className="w-5 h-5" />
                <span>Share</span>
            </button>
            <button className={styles.v_actionButton}>
                <Flag className="w-5 h-5" />
            </button>
        </div>
        {showShare && (
            <VideoShare
                onClose={() => setShowShare(false)}
            />
        )}
    </>;
};

export default VideoDescription;