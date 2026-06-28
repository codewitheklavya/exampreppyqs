import ImageKit from "imagekit";
import { supabase } from "../config/supabase";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export const syncImageKitFiles = async () => {
  const files = await imagekit.listFiles({});

  console.log(`Found ${files.length} files`);

  for (const file of files) {
    console.log(file.name);
  }

  return files;
};