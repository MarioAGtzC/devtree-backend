import User from '../models/user.model';

export const emailExists = async(email = '') => {
  const user = await User.findOne({email});
  if(user) {
    throw new Error(`The email ${email} is already in use`);
  }
}

export const userNameExists = async(username = '') => {
  const user = await User.findOne({username});
  if(user) {
    throw new Error(`The username ${username} is already in use`);
  }
}
