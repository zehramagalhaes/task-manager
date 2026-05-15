import { type Request } from 'express';

export interface SessionUser {
  id: string;
  displayName: string;
  email?: string;
  photo?: string;
  provider: string;
}

export interface AuthRequest extends Request {
  user?: SessionUser;
}
