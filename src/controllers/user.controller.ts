import { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response): Promise<any> => {
  res.json(req.user);
}