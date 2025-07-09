import { Request, Response } from 'express';
import User from '../models/user.model';

export const getByUsername = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username } = req.params;
    const user = await User.findOne({username}).select('-_id -__v -password -email -createdAt -updatedAt');

    if (!user) return res.status(404).json({error: 'User doesn\'t exist'});

    return res.json(user);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

export const searchByUsername = async (req: Request, res: Response): Promise<any> => {
  const { username } = req.body;
  return res.json(`${username} is available`)
}