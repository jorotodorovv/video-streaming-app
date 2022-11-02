import { useState, useContext, useMemo } from 'react';

import Layout from '../../layout/Layout';
import Wrapper from '../../../hoc/Wrapper';

import { VideoContext } from "../../../context/video-context";

import YoutubeFrame from "../../../api/youtube/external/iframe.js";

import VideoCollection from '../../sections/VideoCollection/VideoCollection';
import VideoChannels from '../../sections/VideoChannels/VideoChannels';

import VideoPlayback from '../../../components/VideoPlayback/VideoPlayback';

const Home = (props) => {
  const { changeGToken } = useContext(VideoContext);

  const [currentChannel, setCurrentChannel] = useState();

  const client = useMemo(() => {
    return props.client((response) => {
      changeGToken(response.access_token);
    });
  }, [props.client]);

  return (
    <Layout>
      <Wrapper>
        <VideoChannels
          googleClient={client}
          currentChannel={currentChannel}
          onSetCurrentChannel={setCurrentChannel} />
        <VideoCollection
          frame={YoutubeFrame}
          googleClient={client}
          currentChannel={currentChannel} />
      </Wrapper>
      <VideoPlayback frame={YoutubeFrame} />
    </Layout>
  );
};

export default Home;