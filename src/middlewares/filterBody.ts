import { Request, Response, NextFunction } from 'express';

const filterBody = (arr: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if(!req.body) return next();

  req.body = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => arr.includes(key))
  );

  next();
};

export default filterBody;