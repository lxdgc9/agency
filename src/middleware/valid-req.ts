import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpErr } from "../err/http";

function validReq(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    throw new HttpErr(409, errs.array()[0].msg);
  }
  next();
}

export { validReq };
