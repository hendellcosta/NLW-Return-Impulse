import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient ({
    log: ['query'] // this allows to see any database logs happening, like delete, update...
})