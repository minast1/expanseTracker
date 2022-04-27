import { Criminal, Prisma } from "@prisma/client";
import { db } from "~/lib/db.server"
import { bucket } from "~/lib/firebase";


export type criminalInfoType = Prisma.PromiseReturnType<typeof getAllCriminals>
export const getAllCriminals =async () => {
    const criminals = await db.criminal.findMany({
        select: {
            id: true,
            name: true, 
            email: true,
            phone: true,
            height: true,
            weight: true,
            dob: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return criminals
}

export type criminalById = Prisma.PromiseReturnType<typeof getCriminalById>
export const getCriminalById =async (Id:string) => {
    const criminal = await db.criminal.findFirst({
        where: { id: Id },
        include: {
            crimes: true,
            handler: {
                select: {
                    name: true,
                    badge_number : true 
                }
            }
        }
    });
    //if(!criminal) throw new Error("Not found") else
    return criminal
}

export const createCriminal = async (data: Omit<Criminal, "id" | "createdAt" | "gender"> & { crimes: string[] }) => {
    const { crimes } = data; 
    const criminal = await db.criminal.create({
        data: {
            name: data.name,
            email: data.email,
            height: data.height,
            weight: data.weight,
            dob: new Date(data.dob),
            phone: data.phone,
            court: data.court,
            statement: data.statement ? data.statement : undefined,
            crimes: {
                connect: Array.from(crimes, (el) => { return { id: el } })
            },
            image: data.image ? data.image : undefined,
            policeId: data.policeId
        }
    });
    return criminal
} 

export const deleteCriminalRecord =async (Id:string) => {
    const data = await db.criminal.delete({
        where: {
            id: Id
        }
    });
     //Delete the associated Image from firebase
    if (data.image?.length && data.image.startsWith("https")) {
        const image = data?.image.substring(data?.image.lastIndexOf('F') + 1);
         await bucket.file(`criminals/${image}`).delete();
    }
    return data
}