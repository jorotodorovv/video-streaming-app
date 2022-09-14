import Theme from './hoc/Theme'

import CssBaseline from '@mui/material/CssBaseline';

import YoutubeProvider from './containers/providers/YoutubeProvider';
// import TorrentProvider from './containers/providers/TorrentProvider';

function App() {
  const YOUTUBE_CONFIG_PATH = "/configs/youtube.json";

  return (
    <div className="App">
      <Theme>
        <CssBaseline />
        <YoutubeProvider configPath={YOUTUBE_CONFIG_PATH} />
        {/* <TorrentProvider /> */}
      </Theme>
    </div>
  );
}

export default App;
