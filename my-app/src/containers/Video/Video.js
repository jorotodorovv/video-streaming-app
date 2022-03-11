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

    const [videoProvider, setVideoProvider] = useContext(VideoContext)

    const api = new YoutubeVideosApi({ videosPerRequest: 1 });

    const changeTimeHandler = (time) => {
        let minutes = +time[0];
        let seconds = +time[1] + minutes * 60;

        let provider = { ...videoProvider };
        provider.videos[id] = { ...provider.videos[id], seconds };

        setVideoProvider(provider);

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
            const query = new URLSearchParams(location.search);
            const seconds = +query.get(TIME_QUERY_PARAMETER_NAME);

            let provider = { ...videoProvider };
            provider.videos[id] = { ...provider.videos[id], seconds };
    
            setVideoProvider(provider);
        }

        fetchVideo();
    }, [id]);


    if (videoProvider.videos[id]) {
        let video = videoProvider.videos[id];

        return (
            <Layout>
                <VideoFrame
                    id={id}
                    key={id}
                    ref={ref}
                    height={VIDEO_WIDTH}
                    seconds={video.seconds}
                />
                <VideoDescription
                    key={id}
                    title={video.video.title}
                    description={video.video.description}
                    likes={video.video.likes}
                    onChangeTime={changeTimeHandler} />
            </Layout >
        );
    }

    return null;
}