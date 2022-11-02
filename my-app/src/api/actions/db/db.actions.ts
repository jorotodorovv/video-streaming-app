import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export {
    video,
    videos,
};