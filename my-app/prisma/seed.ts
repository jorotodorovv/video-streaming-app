const fs = require('fs');

import 'cross-fetch/polyfill';

import { PrismaClient } from '@prisma/client'

import YoutubeApi, { VideoResponse, Video } from '../src/api/youtube/youtube';
import ProviderConfigurations from '../src/api/youtube/config';

const prisma = new PrismaClient()

async function main() {
    fs.readFile('/media/joro/aaf9109d-f843-4792-b1d1-126dff7e6184/Code/React/Projects/video-streaming-app/my-app/public/configs/youtube.json', 'utf8', (err, data) => {
        const config: ProviderConfigurations = JSON.parse(data);
        seed(config);
    });
}

async function seed(config: ProviderConfigurations) {
    const api = new YoutubeApi(config, { videosPerRequest: 10 });

    let token = "";

    let videos: Video[] = [];

    for (let index = 0; index < 5; index++) {
        let response: VideoResponse = await api.getVideos(token);

        token = response.token;

        videos = [...videos, ...response.videos];
    }

    let id = 1;

    for (let vid of videos) {
        id++;
        await prisma.videoEntity.create({
            data: {...vid, id},
        }).then((v) => {
            console.log(v);
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
