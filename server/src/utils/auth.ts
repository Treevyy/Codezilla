import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
  exp?: number;
}

export const authMiddleware = ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.split(' ')[1] || '';

  if (!token) {
    return { user: null };
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const decoded = jwt.verify(token, secretKey, { maxAge: '2h' }) as JwtPayload;
    return { user: decoded };
  } catch (err) {
    console.error('JWT Error:', err);
    return { user: null };
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};
