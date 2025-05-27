import { Schema } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

const filterBody = (model: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const allowedFields = Object.keys(model.obj);
  
  req.body = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  );

  next();
};

export default filterBody;