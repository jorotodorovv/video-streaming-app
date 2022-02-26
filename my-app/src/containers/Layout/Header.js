import AppBar from '@mui/material/AppBar';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = (props) => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <VideoLibraryIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
 export default Header;