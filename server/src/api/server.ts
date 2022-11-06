import express from 'express';

import routes from './routes';
import config from '../../configs/routes.config.json';

const app = express();

app.use("/" + config.api, routes);

app.listen(config.port, () => {
  console.log(`Server Running at ${config.port} 🚀`);
});