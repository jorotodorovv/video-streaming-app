import * as React from 'react';
import Frame from '../base/Frame';
import { YoutubeEmbeded } from '../../api/youtube.ts';

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

export default function VideoFrame(props) {

    const embed = new YoutubeEmbeded(props.id);

    const url = embed.exportUrl(props.seconds);

    const width = props.width ?? MAX_WIDTH;
    const height = props.height ?? MAX_HEIGHT;

    return <Frame id={props.id} ref={props.ref} width={width} height={height} src={url} />;
}