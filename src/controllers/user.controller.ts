import formidable from 'formidable';
import { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response): Promise<any> => {
  res.json(req.user);
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    Object.assign(req.user, req.body);
    req.user.save();

    res.status(200).json('User account updated')
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

export const uploadImage = async (req: Request, res: Response): Promise<any> => {
  const form = formidable({ multiples: false });
  try {
    form.parse(req, async (error, fields, files) => {
      console.log(files.file[0].filepath);
    });

    res.status(200).json('Image uploaded successfully');
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}