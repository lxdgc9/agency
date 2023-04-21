import { NextFunction, Request, Response } from "express";

import { HttpErr } from "../err/http";

function permGuard(...perms: string[]) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    if (process.env.NODE_ENV === "dev") {
      return next();
    }

    try {
      if (req.user!.perms.some((p) => perms.includes(p))) {
        return next();
      }

      throw new HttpErr(400, "PERMS_DENIDED");
    } catch (err) {
      next(err);
    }
  };
}

export { permGuard };
