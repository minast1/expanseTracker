import type { Readable } from "stream";
import {
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { bucket } from "./firebase";
import { Court } from "@prisma/client";
import { createCriminal } from "~/controllers/criminalController";



type UploadHandlerArgs = {
    name: string;
  stream: Readable;
    filename: string;
  encoding: string;
  mimetype: string;
}
const uploadHandler = async ({encoding, stream, mimetype,filename}: UploadHandlerArgs) => {
  if (filename.length > 0) {
    // Get the file as a buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    const timestamp = new Date().getTime();
    const extension = filename.split('.').pop();
    const fName = `${timestamp}.${extension}`;
    const instance = await bucket.file(`criminals/${fName}`);
    await instance.save(buffer);
    // Add the known content type to the file
    await instance.setMetadata({
      "Content-Type": mimetype,
      "Content-Encoding": encoding,
    });

    // Make the file publicly readable - maintain other permissions
    // https://googleapis.dev/nodejs/storage/latest/File.html#makePublic
    await instance.makePublic();

    // Return the public URL
    return instance.publicUrl();
  }
  return;
}

export async function criminalImage(request: Request) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const image = formData.get("image") as string | null 
  const name = formData.get("name")as string
  const email = formData.get("email") as string
  const height = Number(formData.get("height") as string)
  const weight = Number(formData.get("weight") as string)
  const dob = formData.get("dob") as any
  const phone = formData.get("phone") as string
  const statement = formData.get("statement") as string | null
  const court = formData.get("court") as Court
  const crimes = formData.getAll("crimes") as string[]
  //console.log(crimes)
    const policeId = formData.get("policeId")as string
    
  return await createCriminal({email, name, height, dob, weight,image, phone, statement,court, crimes, policeId })
}