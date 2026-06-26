import imagekit from "../config/imagekit";

export const uploadToImageKit = async(
    fileBuffer: Buffer,
    fileName: string,
)=>{
    const response = await imagekit.upload({
        file: fileBuffer,
        fileName: fileName,
        useUniqueFileName: false,
    });

    return response;
}