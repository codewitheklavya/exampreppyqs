import { Request, Response } from "express";
import { uploadToImageKit } from "../services/upload.service";

export const uploadFile = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadToImageKit(
      req.file.buffer,
      req.file.originalname
    );

    res.status(200).json({
      success: true,
      message: "PDF uploaded successfully",
      data: result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};