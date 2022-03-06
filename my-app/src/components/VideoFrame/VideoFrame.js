import { useRef, useEffect, useState, forwardRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import YoutubeVideosApi from '../../api/youtube.ts';
import VideoContext from '../../context/VideoContext';
import Wrapper from '../../hoc/Wrapper';


const MAX_WIDTH = "100%";
const MAX_HEIGHT = "100%";

const VideoFrame = forwardRef((props, ref) => {
    const navigate = useNavigate();

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

    const onStateChange = (e) => {
        if (props.onStateChange && e.data === window.YT.PlayerState.PLAYING) {
            props.onStateChange(e);
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