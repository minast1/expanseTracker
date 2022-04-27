import {faker} from '@faker-js/faker';
import { db } from '~/lib/db.server';
import { crimes } from '~/lib/crime.server';

type cData = {
    description:string
}

const crimeData: cData[] = Array.from(crimes, (crime) => {
    return { description: crime }
});

const police = Array.from({ length: 20 }, (el) => ({
    name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
    badge_number: faker.datatype.number({min : 101 , max:999})
}))

async function seed() {
   
              //Crimes  
     /*await db.crime.createMany({
        data: crimeData,
        
     });*/
    
    //case handlers
   /*  await db.police.createMany({
        data: police
    });
    */
    const handlerIds = await db.police.findMany({
        select: {
            id: true
        }
    }); 
    const ids = handlerIds.map((el) => el.id);
    const crimeIds = await db.crime.findMany({
        select: {
            id: true
        }
    });
   // const cIds = crimeIds.map((el) => el.id);

    
     //criminals 
   
        for (let index = 0; index < 30; index++) {
        await db.criminal.create({
            data: {
                  name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
                email: faker.internet.email(),
               height: faker.datatype.float({ min: 1.7, max: 2, precision: 0.1 }),
                weight: faker.datatype.float({ min: 80.1, max: 95.0, precision: 0.01}),
              dob: faker.date.past(45),
             phone: faker.phone.phoneNumber('+233 ## ### ####'),
             statement: faker.lorem.paragraphs(),
           crimes: {
            connect: faker.random.arrayElements(crimeIds, 3)
        },
        image: faker.image.people(600, 700, true),
         // policeId: faker.random.arrayElement(ids)
             }
         })   
    }
    
    
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
})