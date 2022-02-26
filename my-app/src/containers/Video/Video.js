import * as React from 'react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Wrapper from '../../hoc/Wrapper';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Content from '../Layout/Content';
import Frame from '../../components/base/Frame';
import YoutubeVideosApi, { YoutubeEmbeded } from '../../api/youtube.ts';

export default function Video() {
    const { id } = useParams();

    const embed = new YoutubeEmbeded(id);
    const api = new YoutubeVideosApi({ videosPerRequest: 1 });

    const [videoData, setVideoData] = useState({})

    useEffect(() => {
        const fetchVideo = async () => {
            let video = await api.getVideo(id);

            setVideoData(video);
        }

        fetchVideo();
    }, []);

    return (
        <Wrapper>
            <Header />
            <Content title={videoData.title}>
                <Frame width="100%" height="720px" src={embed.exportUrl()} />
            </Content>
            <Footer />
        </Wrapper>
    );
}