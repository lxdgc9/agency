import { Router } from "express";

import { signIn } from "../handler/auth/v1";
import { except } from "../helper/except";

const r = Router();

r.post("/", except(signIn));

export { r as authRouter };
