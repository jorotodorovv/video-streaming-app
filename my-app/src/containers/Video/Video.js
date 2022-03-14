import * as React from 'react';
import { useEffect, useContext, useRef, useState, useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import YoutubeVideosApi from '../../api/youtube/youtube.ts';

import Layout from '../Layout/Layout';
import VideoContext from '../../context/VideoContext';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

import Window from '../../helpers/dom/Window.ts';

const TIME_QUERY_PARAMETER_NAME = "t";
const VIDEO_WIDTH = "720px";

export default function Video(props) {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const ref = useRef();

    const [videoPlayer, dispatchVideoPlayer] = useContext(VideoContext)
    const [video, setVideo] = useState({})

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
                setVideo({ data: video, }); //seconds: videoPlayer.videos[id].seconds });
            }
        }

        fetchVideo();
    }, [api, id]);

    const changeTimeHandler = (time) => {
        let minutes = +time[0];
        let seconds = +time[1] + minutes * 60;

        dispatchVideoPlayer({ type: "VIDEO", id, seconds });

        navigateTime(seconds);
    };

    const navigateTime = (seconds) => {
        const query = new URLSearchParams();
        query.append(TIME_QUERY_PARAMETER_NAME, seconds);

        navigate("?" + query.toString());

        Window.scrollTo(ref);
    };

    if (video.data) {
        return (
            <Layout>
                <VideoPlayer
                    id={id}
                    key={"video_player_" + id}
                    ref={ref}
                    seconds={video.seconds}
                    height={VIDEO_WIDTH}
                />
                <VideoDescription
                    id={id}
                    key={"video_description_" + id}
                    title={video.data.title}
                    description={video.data.description}
                    likes={video.data.likes}
                    onChangeTime={changeTimeHandler} />
            </Layout >
        );
    }

    return null;
}