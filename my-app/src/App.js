import Router from './hoc/Router'
import Theme from './hoc/Theme'

import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <div className="App">
      <Theme>
        <CssBaseline />
        <Router />
      </Theme>
    </div>
  );
}

export default App;
