import express from 'express';
import actions from './actions';
import endpoints from './endpoints';

const router = express.Router();

router.get(endpoints.video, actions[endpoints.video]);
router.get(endpoints.videos, actions[endpoints.videos]);
router.get(endpoints.subscriptions, actions[endpoints.subscriptions]);
router.get(endpoints.channelVideos, actions[endpoints.channelVideos]);

export default router;