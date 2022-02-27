import Wrapper from '../../hoc/Wrapper';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Content from '../Layout/Content';

const Layout = (props) => {
    return (
        <Wrapper>
            <Header title="Video Streaming"/>
            <Content>
                {props.children}
            </Content>
            <Footer />
        </Wrapper>);
};

export default Layout;