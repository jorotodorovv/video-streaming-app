import AppBar from '@mui/material/AppBar';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Header = (props) => {
    return (
        <Button component={Link} to="/">
            <AppBar position="relative">
                <Toolbar>
                    <VideoLibraryIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Button>
    );
};
export default Header;