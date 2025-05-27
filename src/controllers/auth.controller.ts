import { Request, Response } from 'express';

import User from '../models/user.model';
import { hashPassword } from '../utils/auth';

export const createAccount = async (req: Request, res: Response) => {
  const { password } = req.body;  

  const user = new User(req.body);
  
  user.password = await hashPassword(password);

  await user.save();
  
  res.status(201).json({msg: 'Hello World in expresss'})
}