import { useContext, useMemo } from 'react';

import Layout from '../../layout/Layout';

import { VideoContext } from "../../../context/video-context";

import VideoCollection from '../../../components/VideoCollection/VideoCollection'
import VideoPlayback from '../../../components/VideoPlayback/VideoPlayback';

export default function Home(props) {
  const { changeGToken } = useContext(VideoContext);

  const api = useMemo(() => {
    return props.api({
      videosPerRequest: 16,
      maxTitleLength: 30,
      maxDescriptionLength: 100
    })
  }, [props.api]);

  const client = useMemo(() => {
    return props.client((response) => {
      changeGToken(response.access_token);
    });
  }, [props.client]);

  return (
    <Layout>
      <VideoCollection
        api={api}
        googleClient={client} />
      <VideoPlayback />
    </Layout>
  );
}
