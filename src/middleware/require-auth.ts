import { NextFunction, Request, Response } from "express";

import { HttpErr } from "../err/http";

function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "dev") {
    return next();
  }

  if (!req.user) {
    throw new HttpErr(403, "UNAUTHORIZED");
  }
  next();
}

export { requireAuth };
