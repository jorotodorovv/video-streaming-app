import { useState, useContext, useMemo } from 'react';

import Layout from '../../layout/Layout';
import Wrapper from '../../../hoc/Wrapper';

import { VideoContext } from "../../../context/video-context";

import YoutubeFrame from "../../../api/youtube/iframe.js";

import VideoCollection from '../../sections/VideoCollection/VideoCollection';
import VideoChannels from '../../sections/VideoChannels/VideoChannels';

import VideoPlayback from '../../../components/VideoPlayback/VideoPlayback';

const Home = (props) => {
  const { changeGToken } = useContext(VideoContext);

  const [currentChannel, setCurrentChannel] = useState();

  const api = useMemo(() => {
    return props.api({
      videosPerRequest: 16,
    })
  }, [props.api]);

  const client = useMemo(() => {
    return props.client((response) => {
      changeGToken(response.access_token);
    });
  }, [props.client]);

  return (
    <Layout>
      <Wrapper>
        <VideoChannels
          api={api}
          googleClient={client}
          currentChannel={currentChannel}
          onSetCurrentChannel={setCurrentChannel} />
        <VideoCollection
          frame={YoutubeFrame}
          api={api}
          googleClient={client}
          currentChannel={currentChannel} />
      </Wrapper>
      <VideoPlayback frame={YoutubeFrame} />
    </Layout>
  );
};

export default Home;