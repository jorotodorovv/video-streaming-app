import * as React from 'react';
import VideoCollection from '../../components/VideoCollection/VideoCollection'
import Wrapper from '../../hoc/Wrapper';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Content from '../Layout/Content';

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <Content>
        <VideoCollection />
      </Content>
      <Footer />
    </Wrapper>
  );
}
