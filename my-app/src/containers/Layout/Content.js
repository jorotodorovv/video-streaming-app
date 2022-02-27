import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Content = (props) => {
    return (
        <main>
            <Container sx={{ py: 8 }} maxWidth="xl">
                {props.children}
            </Container>
        </main>
    )
};

export default Content;