import * as React from 'react';

import Layout from '../Layout/Layout';
import VideoCollection from '../../components/VideoCollection/VideoCollection'

export default function Home() {
  return (
    <Layout>
      <VideoCollection />
    </Layout>
  );
}
