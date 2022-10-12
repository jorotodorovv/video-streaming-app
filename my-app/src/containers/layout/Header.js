import { Link } from 'react-router-dom';

import Wrapper from '../../hoc/Wrapper';

import styles from './Header.module.css'

const Header = (props) => {
    return (
        <Wrapper className={styles.v_header_nav}>
            <Link className={styles.v_header_nav_home} to="/youtube">
                <h2>{props.title}</h2>
            </Link>
        </Wrapper>
    );
};
export default Header;