import * as React from 'react';
import { useEffect, useContext, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import YoutubeVideosApi from '../../api/youtube.ts';

import Layout from '../Layout/Layout';
import VideoContext from '../../context/VideoContext';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import VideoFrame from '../../components/VideoFrame/VideoFrame';

import Window from '../../helpers/dom/Window.ts';

const TIME_QUERY_PARAMETER_NAME = "t";
const VIDEO_WIDTH = "720px";

export default function Video() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const ref = useRef();

    const [videoData, setVideoData] = useContext(VideoContext)

    const api = new YoutubeVideosApi({ videosPerRequest: 1 });

    const changeTimeHandler = (time) => {
        let minutes = +time[0];
        let seconds = +time[1] + minutes * 60;

        setVideoData({
            video: videoData.video,
            seconds
        });

        navigateTime(seconds);
    };

    const navigateTime = (seconds) => {
        const query = new URLSearchParams();
        query.append(TIME_QUERY_PARAMETER_NAME, seconds);

        navigate("?" + query.toString());

        Window.scrollTo(ref);
    };

    useEffect(() => {
        const fetchVideo = async () => {
            let video = await api.getVideo(id);

            const query = new URLSearchParams(location.search);
            const seconds = +query.get(TIME_QUERY_PARAMETER_NAME);

            setVideoData({ video, seconds });
        }

        fetchVideo();
    }, [id]);

    return (
        <Layout>
            <VideoFrame
                id={id}
                key={id}
                ref={ref}
                video={videoData.video}
                seconds={videoData.seconds}
                height={VIDEO_WIDTH} />
            <VideoDescription
                key={id}
                title={videoData.video.title}
                description={videoData.video.description}
                likes={videoData.video.likes}
                onChangeTime={changeTimeHandler} />
        </Layout >
    );
}