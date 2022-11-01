const fs = require('fs');

import 'cross-fetch/polyfill';

import { PrismaClient } from '@prisma/client'

import YoutubeApi, { VideoResponse, Video } from '../src/api/youtube/external/youtube';
import ProviderConfigurations from '../src/api/youtube/config';

import config from '../public/configs/youtube.json';

const MAX_REQUESTS_COUNT = 20;

const prisma = new PrismaClient()

async function main() {
    seed(config);
}

async function seed(config: ProviderConfigurations) {
    const api = new YoutubeApi(config);

    let token = config.query.initialToken;

    for (let i = 0; i < MAX_REQUESTS_COUNT; i++) {
        let response: VideoResponse = await api.getVideos(token);

        await prisma.tokenEntity.create({
            data: {
                currentToken: token,
                nextToken: response.token,
                videos: {
                    create: response.videos
                }
            },
        });

        token = response.token;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });