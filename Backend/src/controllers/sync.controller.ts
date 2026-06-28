import { Request, Response } from "express";
import { syncImageKitFiles } from "../services/sync.service";

export const syncFiles = async (
  req: Request,
  res: Response
) => {
  try {
    const files = await syncImageKitFiles();

    res.json({
      success: true,
      total: files.length,
      files,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Sync failed",
    });
  }
};