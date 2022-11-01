import express from 'express';
import actions from './actions';
import endpoints from './endpoints';

const router = express.Router();

router.get(endpoints.video, actions[endpoints.video]);
router.get(endpoints.videos, actions[endpoints.videos]);

export default router;