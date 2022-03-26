import { useMemo } from 'react';

import Layout from '../../layout/Layout';
import VideoCollection from '../../../components/VideoCollection/VideoCollection'
import VideoPlayback from '../../../components/VideoPlayback/VideoPlayback';

export default function Home(props) {
  const api = useMemo(() => {
    return props.api({
      videosPerRequest: 16,
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
