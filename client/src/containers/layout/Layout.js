import Wrapper from '../../hoc/Wrapper';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Content from '../layout/Content';

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