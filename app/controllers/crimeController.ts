import { Prisma } from "@prisma/client";
import { db } from "~/lib/db.server"



export type CrimesAndHandlers = Prisma.PromiseReturnType<typeof getAllCrimesAndHandlers>
export const getAllCrimesAndHandlers =async () => {
    const crimes = await db.crime.findMany({
        select: {
            id: true,
            description: true
        }
    });
    
    const handlers = await db.police.findMany({
        select: {
            id: true,
            name: true
        }
    });

    return {crimes, handlers}
}


