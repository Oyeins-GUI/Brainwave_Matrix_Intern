import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const token = req.cookies.token;

   if (!token) {
      res.sendStatus(403);
      return;
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
   (req as any).user = decoded;
   next();
};
