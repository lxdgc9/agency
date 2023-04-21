import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { HttpErr } from "../err/http";

function redirectVer(
  payload: Record<string, RequestHandler>
) {
  return function (
    this: Record<string, RequestHandler>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const ver = req.header("x-api-version") || "v1";
      if (!payload[ver]) {
        throw new HttpErr(400, "VERSION_NOT_FOUND");
      }

      payload[ver].call(this, req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

export { redirectVer };
