import { Request, Response } from "express";

export const uploadFile = async (
  req: Request,
  res: Response
) => {
  console.log(req.file);

  res.json({
    success: true,
    file: req.file,
  });
};