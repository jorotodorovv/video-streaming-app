import AppBar from '@mui/material/AppBar';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { Link } from 'react-router-dom';

import Wrapper from '../../hoc/Wrapper';

import styles from './Header.module.css'

const Header = (props) => {
    return (
        <Wrapper className={styles.v_header_nav}>
            <Button className={styles.v_header_nav_home} component={Link} to="/youtube">
                <AppBar position="relative">
                    <Toolbar>
                        <VideoLibraryIcon sx={{ mr: 2 }} />
                        <Typography variant="h6" color="inherit" noWrap>
                            {props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Button>
        </Wrapper>
    );
};
export default Header;