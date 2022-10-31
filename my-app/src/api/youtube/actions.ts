import { PrismaClient } from "@prisma/client";

import endpoints from "./endpoints";

const prisma = new PrismaClient();

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

const actions = {};

actions[endpoints.videos] = videos;

export default actions;