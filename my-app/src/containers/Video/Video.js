import * as React from 'react';
import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Wrapper from '../../hoc/Wrapper';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Content from '../Layout/Content';
import Frame from '../../components/base/Frame';
import YoutubeVideosApi, { YoutubeEmbeded } from '../../api/youtube.ts';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideoDescription from '../../components/VideoDescription/VideoDescription';

export default function Video() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const embed = new YoutubeEmbeded(id);
    const api = new YoutubeVideosApi({ videosPerRequest: 1 });

    const [videoData, setVideoData] = useState({ video: {}, seconds: 0 })

    const changeTimeHandler = (time) => {
        let minutes = +time[0];
        let seconds = +time[1];

        let duration = minutes * 60 + seconds;

        setVideoData({ ...videoData, seconds: duration });

        navigate(`?t=${duration}`);
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

    const url = embed.exportUrl(videoData.seconds);

    return (
        <Wrapper>
            <Header />
            <Content>
                <Frame width="100%" height="720px" src={url} />
                <Accordion sx={{ p: 2 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fontSize="large" />}>
                        <Typography variant="h4">{videoData.video.title}</Typography>                     
                    </AccordionSummary>
                    <AccordionDetails sx={{ pr: 50 }}>
                        <VideoDescription
                            key={id}
                            description={videoData.video.description}
                            onChangeTime={changeTimeHandler}
                        />
                    </AccordionDetails>
                </Accordion>
            </Content>
            <Footer />
        </Wrapper>
    );
}