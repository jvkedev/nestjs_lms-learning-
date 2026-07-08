import type { JwtPayload } from '../auth/jwtPayload.interface';

declare module 'express' {
  interface Request {
    user: JwtPayload;
  }
}
