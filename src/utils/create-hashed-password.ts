import crypto from 'crypto';

export const createHashedPassword = (password: string) => {
  return crypto.createHash('sha512').update(password).digest('base64');
};
