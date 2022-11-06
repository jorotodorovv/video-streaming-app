import Accordion from '../base/Accordion/Accordion';

import VideoParagraph from "../VideoParagraph/VideoParagraph";

import styles from './VideoDescription.module.css';

const DESCRIPTION_PARAGRAPH_SEPARATOR = "\n";

const VideoDescription = (props) => {
    let description = null;

    let index = 0;

    if (props.description) {
        description = props.description.split(DESCRIPTION_PARAGRAPH_SEPARATOR)
            .map(p => <VideoParagraph
                key={"video_paragraph_" + props.id + `_${index++}`}
                text={p} 
                onChangeTime={props.onChangeTime} />);
    }

    return (
        <Accordion
            title={<h1>{props.title}</h1>}
            buttonClass={styles.v_description_button}
            panelClass={styles.v_description_panel}
            activeClass={styles.active}>
            <h4>{props.likes} likes</h4>
            {description}
        </Accordion>
    );
};

export default VideoDescription;