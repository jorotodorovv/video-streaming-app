import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = (props) => {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                {props.title}
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p">
                {props.description}
            </Typography>
        </Box>
    );
};

export default Footer;
