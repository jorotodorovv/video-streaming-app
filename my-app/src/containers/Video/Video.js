import * as React from 'react';
import { useEffect, useContext, useRef, useState, useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import Layout from '../Layout/Layout';
import VideoContext from '../../context/VideoContext';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

import Window from '../../helpers/dom/Window.ts';

const TIME_QUERY_PARAMETER_NAME = "t";
const VIDEO_WIDTH = "720px";

export default function Video(props) {
    const { id } = useParams();
    const ref = useRef();

    const location = useLocation();
    const navigate = useNavigate();

    const [videoPlayer, dispatchVideoPlayer] = useContext(VideoContext);
    const [currentVideo, setCurrentVideo] = useState({});

    const api = useMemo(() => {
        return props.api({
            videosPerRequest: 1
        })
    }, [props.api]);

    useEffect(() => {
        const fetchVideo = async () => {
            if (api) {
                let video = await api.getVideo(id);

                const query = new URLSearchParams(location.search);
                let seconds = +query.get(TIME_QUERY_PARAMETER_NAME);

                dispatchVideoPlayer({ type: "VIDEO", id, video, seconds });
            }
        }

        fetchVideo();
    }, [api, id]);

    useEffect(() => {
        if (videoPlayer.videos) {
            let video = videoPlayer.videos[id];
            if (video) {
                setCurrentVideo({ video, seconds: video.seconds });
            }
        }
    }, [videoPlayer.videos]);

    const changeTimeHandler = (time) => {
        let minutes = +time[0];
        let seconds = +time[1] + minutes * 60;

        dispatchVideoPlayer({ type: "VIDEO", id, seconds });

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

    if (currentVideo.video) {
        return (
            <Layout>
                <VideoPlayer
                    id={id}
                    key={"video_player_" + id}
                    ref={ref}
                    seconds={currentVideo.seconds}
                    height={VIDEO_WIDTH}
                    onNavigateTime={navigateTimeHandler}
                />
                <VideoDescription
                    id={id}
                    key={"video_description_" + id}
                    title={currentVideo.video.title}
                    description={currentVideo.video.description}
                    likes={currentVideo.video.likes}
                    onChangeTime={changeTimeHandler} />
            </Layout >
        );
    }

    return null;
}