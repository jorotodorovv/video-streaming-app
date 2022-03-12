import { Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Text from "../../helpers/basic/Text.ts";

const TIMESTAMP_FORMAT_RGX = /([0-9]+:[0-9]+)/g;
const URL_FORMAT_RGX = /([A-Za-z]{3,9}:(?:\/\/)?(?:[\-;:&=\+\$,\w]+@?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)(?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*)?\?*[A-Za-z0-9\.\-=&]*)/g;

const VideoParagraph = (props) => {
    const [paragraph, setParagraph] = useState();

    const replaceTimestamps = (timestamp) => {
        if (timestamp) {
            let time = timestamp.split(":");

            return (
                <Link
                    style={{ cursor: "pointer" }}
                    onClick={props.onChangeTime.bind(this, time)}
                    color="secondary"
                    underline="none">
                    {timestamp}
                </Link>
            );
        }
    }

    const replaceHyperlinks = (link, i) => {
        return <Link href={link}
            color="secondary"
            underline="none"
            target="_blank">{link}</Link>;
    }

    useEffect(() => {
        let elements = [];

        if (!props.text || props.text === "") {
            elements.push(<br />);
        }
        else {
            let text = new Text(props.text)
                .replace(TIMESTAMP_FORMAT_RGX, replaceTimestamps);

            for (let element of text) {
                let elementSegments = new Text(element)
                    .replace(URL_FORMAT_RGX, replaceHyperlinks);
                    
                for (let elementText of elementSegments) {
                    elements.push(elementText);
                }
            }
        }

        setParagraph(elements);
    }, []);

    return <Typography>{paragraph}</Typography>;
};

export default VideoParagraph;