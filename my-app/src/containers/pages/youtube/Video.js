import { useEffect, useContext, useMemo, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';

import Layout from '../../layout/Layout';

import { VideoContext } from '../../../context/video-context';
import VideoContent from '../../../components/VideoContent/VideoContent';

import Cache from '../../../helpers/basic/Cache.ts'
import YoutubeFrame from '../../../api/youtube/external/iframe';
import { SettingsContext } from '../../../context/settings-context';


export default function Video(props) {
    const VIDEO_COLLECTION_CACHE_KEY = "youtube_vids";
    let cache = new Cache(VIDEO_COLLECTION_CACHE_KEY);

    const { id, token } = useParams();
    const location = useLocation();

    const { videoPlayer, changePlayer, changeVideo } = useContext(VideoContext);
    const { videoSettings } = useContext(SettingsContext);

    const [currentPlayer, setCurrentPlayer] = useState();

    useEffect(() => {
        const fetchVideo = async () => {
            let video = await getVideo();

            const query = new URLSearchParams(location.search);
            let seconds = +query.get(videoSettings.query.timeQuery);

            changePlayer(id, video, seconds);
            setCurrentPlayer({ video, seconds });
        }

        fetchVideo();
    }, [id]);

    let getVideo = async () => {
        let videoData = videoPlayer.videos[id];

        if (!videoData) {
            return await fetch(`http://localhost:3000/api/videos/${id}`)
                .then((response) => {
                    return response.json();
                })
        }

        return videoData.video;
    }

    let content = currentPlayer ?
        <VideoContent
            id={id}
            key={"video_content_" + id}
            frame={YoutubeFrame}
            player={currentPlayer}
            width="720px"
            timeQueryParam={videoSettings.query.timeQuery}
            onChangeVideo={changeVideo}
        /> : null;

    return (
        <Layout>
            {content}
        </Layout >
    );
}