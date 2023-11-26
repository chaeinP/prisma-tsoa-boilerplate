import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UnAuthorizedException } from '../common/exceptions/unauthorized-exception';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function expressAuthentication(req: Request, securityName: string, scopes?: string[]) {
  const token = req.headers.authorization?.split(' ')[1];

  return new Promise((resolve, reject) => {
    try {
      if (!token) {
        reject(new UnAuthorizedException());
      }

      const decoded = jwt.verify(token!, process.env.JWT_SECRET_KEY!, { issuer: 'sp-slidtodo' }) as {
        id: number;
        teamId: string;
      };

      if (req.params.teamId !== (decoded as { id: number; teamId: string }).teamId) {
        reject(new UnAuthorizedException());
      }

      req.user = decoded;
      resolve(decoded);
    } catch (err) {
      reject(new UnAuthorizedException());
    }
  });
}
