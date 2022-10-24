import { useEffect, useContext, useMemo, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';

import Layout from '../../layout/Layout';

import { VideoContext } from '../../../context/video-context';
import VideoContent from '../../../components/VideoContent/VideoContent';

import Cache from '../../../helpers/basic/Cache.ts'


export default function Video(props) {
    const VIDEO_COLLECTION_CACHE_KEY = "youtube_vids";
    let cache = new Cache(VIDEO_COLLECTION_CACHE_KEY);

    const { id, token } = useParams();
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
                let video = await getVideo();

                const query = new URLSearchParams(location.search);
                let seconds = +query.get(api.timeQueryParam);

                changePlayer(id, video, seconds);
            }
        }

        fetchVideo();
    }, [api, id]);

    let getVideo = async () => {
        let videoData = videoPlayer.videos[id];

        if (!videoData) {
            return await api.getVideo(id);
        }

        return videoData.video;
    }

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