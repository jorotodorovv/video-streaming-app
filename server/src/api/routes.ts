import express from 'express';

import { video, videos } from './actions/db.actions';
import { settings, channelVideos, subscriptions } from './actions/youtube.actions';

import config from '../../../common/configs/routes.config.json';

const routes = express.Router();

routes.get(config.settings, settings);
routes.get(config.video, video);
routes.get(config.videos, videos);
routes.get(config.subscriptions, subscriptions);
routes.get(config.channelVideos, channelVideos);

export default routes;