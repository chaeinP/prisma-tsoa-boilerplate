import jwt from 'jsonwebtoken';

export const generateAccessToken = ({ id, teamId }: { id: number; teamId: string }) => {
  const token = jwt.sign({ id, teamId }, process.env.JWT_SECRET_KEY!, {
    issuer: 'sp-slidtodo',
    expiresIn: '1h',
  });

  return token;
};
