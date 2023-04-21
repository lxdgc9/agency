import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Types } from "mongoose";

import { HttpErr } from "../err/http";

type UserPayload = {
  id: Types.ObjectId;
  perms: string[];
  active: boolean;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

function decodeJwt(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "dev") {
    return next();
  }

  try {
    const token =
      req.headers["authorization"]?.split("Bearer ")[1];
    if (!token) {
      throw new HttpErr(403, "REQUIRE_TOKEN");
    }

    req.user = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as UserPayload;
    next();
  } catch (err) {
    next(err);
  }
}

export { decodeJwt };
