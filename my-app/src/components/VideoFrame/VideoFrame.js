import * as React from 'react';
import YouTube from 'react-youtube';

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

export default function VideoFrame(props) {
    const opts = {
        height: props.height ?? MAX_HEIGHT,
        width: props.width ?? MAX_WIDTH,
        playerVars: {
            start: props.seconds,
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            fs: 0,
        },
    };

    return <YouTube videoId={props.id} ref={props.ref} opts={opts} />;
}