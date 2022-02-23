import { createTheme, ThemeProvider } from '@mui/material/styles';

const themeOptions = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#252525',
            dark: '#730c0c',
            light: '#675e5e',
        },
        secondary: {
            main: '#831616',
        },
        background: {
            default: '#212121',
            paper: '#282828',
        },
    },
});

const Theme = (props) => <ThemeProvider theme={themeOptions}>{props.children}</ThemeProvider>

export default Theme;