import Theme from './hoc/Theme'

import CssBaseline from '@mui/material/CssBaseline';
import YoutubeProvider from './containers/providers/YoutubeProvider';

function App() {
  return (
    <div className="App">
      <Theme>
        <CssBaseline />
        <YoutubeProvider />
      </Theme>
    </div>
  );
}

export default App;
