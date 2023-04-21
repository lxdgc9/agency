import { NextFunction, Request, Response } from "express";

function except(fn: Function) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise.resolve(fn(req, res, next)).catch(next);
}

export { except };
