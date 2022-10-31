const fs = require('fs');

import 'cross-fetch/polyfill';

import { PrismaClient } from '@prisma/client'

import YoutubeApi, { VideoResponse, Video } from '../src/api/youtube/youtube';
import ProviderConfigurations from '../src/api/youtube/config';

const prisma = new PrismaClient()

async function main() {
    fs.readFile('./public/configs/youtube.json', 'utf8', (err, data) => {
        const config: ProviderConfigurations = JSON.parse(data);
        seed(config);
    });
}

async function seed(config: ProviderConfigurations) {
    const api = new YoutubeApi(config, { videosPerRequest: 10 });

    let token = '';

    for (let i = 0; i < 5; i++) {
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
