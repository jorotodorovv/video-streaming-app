import * as React from 'react';

import Layout from '../Layout/Layout';
import VideoCollection from '../../components/VideoCollection/VideoCollection'
import VideoPlayback from '../../components/VideoPlayback/VideoPlayback';

export default function Home(props) {
  return (
    <Layout>
      <VideoCollection api={props.api}/>
      <VideoPlayback/>
    </Layout>
  );
}
