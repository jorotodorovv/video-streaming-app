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