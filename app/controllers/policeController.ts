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