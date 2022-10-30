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
    const api = new YoutubeApi(config, { videosPerRequest: 100 });
    let response: VideoResponse = await api.getVideos();
    console.log(response)

    for (let video of response.videos) {
        await prisma.videoEntity.create({
            data: video,
        });
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
