import express from 'express';

import endpoints from './endpoints';
import routes from './routes';

const app = express();

app.use(endpoints.api, routes);

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});