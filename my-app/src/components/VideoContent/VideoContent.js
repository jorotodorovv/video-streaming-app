import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import VideoDescription from '../../components/VideoDescription/VideoDescription';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

import Window from '../../helpers/dom/Window.ts';
import Wrapper from '../../hoc/Wrapper';

const TIME_QUERY_PARAMETER_NAME = "t";
const VIDEO_WIDTH = "720px";

export default function Video(props) {
    const ref = useRef();
    const navigate = useNavigate();

    const changeTimeHandler = (time) => {
        let minutes = +time[0];
        let seconds = +time[1] + minutes * 60;

        props.onLoadVideo(props.id, seconds);

        navigateTimeHandler(seconds);
    };

    const navigateTimeHandler = (seconds) => {
        if (seconds > 1) {
            const query = new URLSearchParams();
            query.append(TIME_QUERY_PARAMETER_NAME, seconds);

            navigate("?" + query.toString());
        }

        Window.scrollTo(ref);
    };

    if (props.player) {
        let video = props.player.video;

        return (
            <Wrapper>
                <VideoPlayer
                    id={props.id}
                    key={"video_player_" + props.id}
                    ref={ref}
                    seconds={props.player.seconds}
                    height={VIDEO_WIDTH}
                    onNavigateTime={navigateTimeHandler}
                />
                <VideoDescription
                    id={props.id}
                    key={"video_description_" + props.id}
                    title={video.title}
                    description={video.description}
                    likes={video.likes}
                    onChangeTime={changeTimeHandler} />
            </Wrapper >
        );
    }

    return null;
}