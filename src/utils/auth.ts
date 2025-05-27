import bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt();
  return await bcryptjs.hash(password, salt);
}

export const comparePassword = async (password: string, hash: string) => {
  return await bcryptjs.compare(password, hash);
}