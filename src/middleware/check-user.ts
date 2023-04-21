import { NextFunction, Request, Response } from "express";
import { HttpErr } from "../err/http";

function checkUser(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "dev") {
    return next();
  }

  if (!req.user!.active) {
    throw new HttpErr(403, "ACCESS_DENIED");
  }
  next();
}

export { checkUser };
