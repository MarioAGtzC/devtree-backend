import { Request, Response } from 'express';

import User from '../models/user.model';
import { generateJWT } from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/auth';

export const createAccount = async (req: Request, res: Response) => {
  const { password } = req.body;  

  const user = new User(req.body);
  
  user.password = await hashPassword(password);

  await user.save();
  
  res.status(201).json('User account created')
}

export const login = async(req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  
  const user = await User.findOne({email});
  if(!user) {
    return res.status(404).json({error: 'Email doesn\'t exist'});
  }

  const isCorrectPassword = await comparePassword(password, user.password);
  if(!isCorrectPassword) {
    return res.status(401).json({error: 'Invalid password'});
  }

  const token = generateJWT({id: user._id});
  
  res.send(token);
}