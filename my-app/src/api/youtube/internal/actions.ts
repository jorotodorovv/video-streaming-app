const fs = require('fs');

import 'cross-fetch/polyfill';

import { PrismaClient } from "@prisma/client";
import YoutubeApi from "../external/youtube";

import endpoints from "./endpoints";

import config from '../../../../public/configs/youtube.json';

const prisma = new PrismaClient();
const youtubeApi = new YoutubeApi(config);

async function video(req, res): Promise<void> {
    const response = await prisma.videoEntity.findFirst({
        where: {
            videoId: req.params.id,
        }
    });

    res.send(response);
}

async function videos(req, res): Promise<void> {
    const response = await prisma.tokenEntity.findFirst({
        where: {
            currentToken: req.params.token,
        },
        include: {
            videos: true
        }
    });

    res.send(response);
}

async function subscriptions(req, res): Promise<void> {
    const response = await youtubeApi.getSubscriptions(req.params.token);

    res.send(response);
}

const actions = {};

actions[endpoints.video] = video;
actions[endpoints.videos] = videos;
actions[endpoints.subscriptions] = subscriptions;

export default actions;