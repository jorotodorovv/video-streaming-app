import express from 'express';
import actions from './actions';

import config from './routes.config.json';

const routes = express.Router();

routes.get(config.video, actions.video);
routes.get(config.videos, actions.videos);
routes.get(config.subscriptions, actions.subscriptions);
routes.get(config.channelVideos, actions.channelVideos);

export default routes;