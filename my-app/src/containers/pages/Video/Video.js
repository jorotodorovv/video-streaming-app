import { useEffect, useContext, useMemo, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';

import Layout from '../../layout/Layout';

import { VideoContext } from '../../../context/video-context';
import VideoContent from '../../../components/VideoContent/VideoContent';

export default function Video(props) {
    const { id } = useParams();
    const location = useLocation();

    const { videoPlayer, changePlayer, changeVideo } = useContext(VideoContext);
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

                changePlayer(id, video, seconds);
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

    let content = currentPlayer ?
        <VideoContent
            id={id}
            key={"video_content_" + id}
            player={currentPlayer}
            width="720px"
            timeQueryParam={api.timeQueryParam}
            onChangeVideo={changeVideo}
        /> : null;

    return (
        <Layout>
            {content}
        </Layout >
    );
}