import { Police, Prisma } from "@prisma/client";
import { db } from "~/lib/db.server"


export const getAllPolice = async () => {
   const data =  await db.police.findMany({
        select: {
            id: true, 
            name: true 
      }
  })
    return data; 
}

export const createPolice =async (formData: Omit<Police, "id">) => {
    const data = await db.police.create({
        data: formData
    });
    return data;
}

 export type policeWithCaseType = Prisma.PromiseReturnType<typeof getAllPoliceWithCases>
export const getAllPoliceWithCases = async () => {
    const data = await db.police.findMany({
        include: {
            case: true
        },
        orderBy: {
           id : 'desc'
       }
    });
    return data;
}