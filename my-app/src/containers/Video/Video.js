import { useEffect, useContext, useMemo, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';

import Layout from '../Layout/Layout';

import VideoContext from '../../context/VideoContext';
import VideoContent from '../../components/VideoContent/VideoContent';

export default function Video(props) {
    const { id } = useParams();
    const location = useLocation();

    const [videoPlayer, dispatchVideoPlayer] = useContext(VideoContext);
    const [currentPlayer, setCurrentPlayer] = useState();

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
                let seconds = +query.get(api.timeQueryParam);

                loadVideoHandler(id, seconds, video);
            }
        }

        fetchVideo();
    }, [api, id]);

    useEffect(() => {
        if (videoPlayer.videos) {
            let video = videoPlayer.videos[id];
            if (video) {
                setCurrentPlayer(video);
            }
        }
    }, [videoPlayer.videos]);

    const loadVideoHandler = (id, seconds, video) => {
        dispatchVideoPlayer({ type: "VIDEO", id, seconds, video });
    }

    if (currentPlayer) {
        return (
            <Layout>
                <VideoContent
                    id={id}
                    key={"video_content_" + id}
                    player={currentPlayer}
                    width="720px"
                    timeQueryParam={api.timeQueryParam}
                    onLoadVideo={loadVideoHandler}
                />
            </Layout >
        );
    }

    return null;
}