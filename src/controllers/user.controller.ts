import formidable from 'formidable';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import cloudinary from '../config/cloudinary';

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
      if(Object.keys(files).length === 0) {
        return res.status(500).json({error: 'There is no file to upload'});
      }
      cloudinary.uploader.upload(files.file[0].filepath, { public_id: uuid() }, async function(error, result) {
        if(error) {
          return res.status(500).json({error: error.message});
        }
        if(result) {
          if(req.user.image) {
            const publicId = req.user.image.split('/').at(-1)?.split('.')[0];
            if (publicId) await cloudinary.uploader.destroy(publicId);
          }
          req.user.image = result.secure_url;
          await req.user.save();
          res.json({ image: result.secure_url });
        }
      })
    });
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}