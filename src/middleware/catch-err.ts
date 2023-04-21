import { NextFunction, Request, Response } from "express";

import { HttpErr } from "../err/http";

function catchErr(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);

  if (err instanceof HttpErr) {
    return res.status(err.code).send({ msg: err.message });
  }

  if (err instanceof Object) {
  }

  res.status(500).json({
    msg: "SOMETHING_WENT_WRONG",
  });
}

export { catchErr };
