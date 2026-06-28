import { Request, Response } from "express";
import { syncImageKitFiles } from "../services/sync.service";

export const syncFiles = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await syncImageKitFiles();

    res.json({
      success: true,
      total: result.papersToInsert.length,
      skipped: result.skipped,
      failed: result.failed,
      papers: result.papersToInsert,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Sync failed",
    });
  }
};