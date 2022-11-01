const fs = require('fs');

import 'cross-fetch/polyfill';

import { PrismaClient } from '@prisma/client'

import YoutubeApi, { VideoResponse, Video } from '../src/api/youtube/external/youtube';
import ProviderConfigurations from '../src/api/youtube/config';

const prisma = new PrismaClient()

async function main() {
    fs.readFile('./public/configs/youtube.json', 'utf8', (err, data) => {
        const config: ProviderConfigurations = JSON.parse(data);
        seed(config);
    });
}

async function seed(config: ProviderConfigurations) {
    const api = new YoutubeApi(config);

    let token = config.query.initialToken;

    for (let i = 0; i < 20; i++) {
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
