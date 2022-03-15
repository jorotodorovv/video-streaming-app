import { useMemo } from 'react';

import Layout from '../Layout/Layout';
import VideoCollection from '../../components/VideoCollection/VideoCollection'
import VideoPlayback from '../../components/VideoPlayback/VideoPlayback';

export default function Home(props) {
  const api = useMemo(() => {
    return props.api({
      videosPerRequest: 4,
      maxTitleLength: 30,
      maxDescriptionLength: 100
    })
  }, [props.api]);

  return (
    <Layout>
      <VideoCollection api={api} />
      <VideoPlayback />
    </Layout>
  );
}
