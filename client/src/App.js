import Theme from './hoc/Theme'

import CssBaseline from '@mui/material/CssBaseline';

import YoutubeProvider from './containers/providers/YoutubeProvider';
// import TorrentProvider from './containers/providers/TorrentProvider';

function App() {
  return (
    <div className="App">
      <Theme>
        <CssBaseline />
        <YoutubeProvider />
        {/* <TorrentProvider /> */}
      </Theme>
    </div>
  );
}

export default App;
