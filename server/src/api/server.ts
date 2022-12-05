import express from 'express';

import routes from './routes';
import config from '../../../common/configs/routes.config.json';

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/" + config.api, routes);

app.listen(config.port, () => {
  console.log(`Server Running at ${config.port} 🚀`);
});