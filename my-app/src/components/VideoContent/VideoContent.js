import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import VideoDescription from '../../components/VideoDescription/VideoDescription';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

import Window from '../../helpers/dom/Window.ts';
import Wrapper from '../../hoc/Wrapper';

export default function VideoContent(props) {
    const ref = useRef();
    const navigate = useNavigate();

    const video = props.player.video;

    const changeTimeHandler = (time) => {
        let minutes = +time[0];
        let seconds = +time[1] + minutes * 60;

        props.onChangeVideo(props.id, video);

        navigateTimeHandler(seconds);
    };

    const navigateTimeHandler = (seconds) => {
        if (seconds > 1) {
            const query = new URLSearchParams();
            query.append(props.timeQueryParam, seconds);

            navigate("?" + query.toString());
        }

        Window.scrollTo(ref);
    };

    return (
        <Wrapper>
            <VideoPlayer
                id={props.id}
                key={"video_player_" + props.id}
                ref={ref}
                seconds={props.player.seconds}
                height={props.width}
                onNavigateTime={navigateTimeHandler}
            />
            <VideoDescription
                id={props.id}
                key={"video_description_" + props.id}
                title={video.title.text}
                description={video.description.text}
                likes={video.likes}
                onChangeTime={changeTimeHandler} />
        </Wrapper >
    );
}