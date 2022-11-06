import express from 'express';

import { video, videos } from './actions/db.actions';
import { channelVideos, subscriptions } from './actions/youtube.actions';

import config from '../../configs/routes.config.json';

const routes = express.Router();

routes.get(config.video, video);
routes.get(config.videos, videos);
routes.get(config.subscriptions, subscriptions);
routes.get(config.channelVideos, channelVideos);

export default routes;