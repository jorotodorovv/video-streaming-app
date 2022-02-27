import VideoParagraph from "../VideoParagraph/VideoParagraph";

const DESCRIPTION_PARAGRAPH_SEPARATOR = "\n";

const VideoDescription = (props) => {
    let description = null;

    if (props.description) {
        description = props.description.split(DESCRIPTION_PARAGRAPH_SEPARATOR)
            .map(p => <VideoParagraph text={p} onChangeTime={props.onChangeTime} />);
    }

    return description;
};

export default VideoDescription;