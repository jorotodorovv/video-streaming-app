import { forwardRef, useContext, useMemo, useState } from 'react';
import YouTube from 'react-youtube';
import VideoContext from '../../context/VideoContext';

import Wrapper from '../../hoc/Wrapper';

const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

const VideoFrame = forwardRef((props, ref) => {
    const [videoData, setVideoData] = useContext(VideoContext)

    const opts = useMemo(() => {
        return {
            height: props.height ?? MAX_HEIGHT,
            width: props.width ?? MAX_WIDTH,
            playerVars: {
                start: props.seconds,
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
                fs: 0,
            }
        };
    }, []);

    const stateChangeHandler = (e) => {
        let seconds = ~~e.target.getCurrentTime();

        setVideoData({
            video: videoData.video,
            seconds
        });
    };

    const onStateChange = (e) => {
        if (e.data === window.YT.PlayerState.PLAYING) {
            stateChangeHandler(e);
        }
    };

    return (
        <Wrapper ref={ref}>
            <YouTube
                videoId={props.id}
                opts={opts}
                onStateChange={onStateChange} />
        </Wrapper>
    );
});

export default VideoFrame;