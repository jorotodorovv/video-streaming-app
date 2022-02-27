import { createTheme, ThemeProvider } from '@mui/material/styles';

const themeOptions = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#292929',
      dark: '#521717',
      light: '#4e1a1a',
    },
    secondary: {
      main: '#d43232',
    },
    background: {
      default: '#212121',
      paper: '#282828',
    },
    text: {
      primary: '#f9f9f9',
      secondary: 'rgba(119,119,119,0.7)',
      disabled: 'rgba(92,92,92,0.5)',
    },
  }
});

const Theme = (props) => <ThemeProvider theme={themeOptions}>{props.children}</ThemeProvider>

export default Theme;