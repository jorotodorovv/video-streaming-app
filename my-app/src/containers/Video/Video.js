import * as React from 'react';
import { useEffect, useRef, useContext } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import YoutubeVideosApi from '../../api/youtube.ts';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import Layout from '../Layout/Layout';
import VideoContext from '../../context/VideoContext';
import VideoFrame from '../../components/VideoFrame/VideoFrame';

export default function Video() {
    const { id } = useParams();
    const ref = useRef();

    const navigate = useNavigate();
    const location = useLocation();

    const [videoData, setVideoData] = useContext(VideoContext)
    const api = new YoutubeVideosApi({ videosPerRequest: 1 });

    const changeTimeHandler = (time) => {
        let minutes = +time[0];
        let seconds = +time[1];

        let duration = minutes * 60 + seconds;

        setVideoData({ ...videoData, seconds: duration });

        const query = new URLSearchParams(location.search);
        query.append("t", duration);

        navigate("?" + query.toString());

        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const fetchVideo = async () => {
            let video = await api.getVideo(id);

            const query = new URLSearchParams(location.search);
            const seconds = +query.get("t");

            setVideoData({ video, seconds });
        }

        fetchVideo();
    }, [id]);

    return (
        <Layout>
            <VideoFrame id={id} ref={ref} seconds={videoData.seconds} height="720px" />
            <VideoDescription
                key={id}
                title={videoData.video.title}
                description={videoData.video.description}
                likes={videoData.video.likes}
                onChangeTime={changeTimeHandler} />
        </Layout >
    );
}