import { Request, Response } from "express";
import { auth } from "firebase-admin";
import { User } from "../../../model/user";
import { Prof } from "../../../model/prof";
import { sign } from "jsonwebtoken";

type ReqDto = {
  token: string;
};

async function signIn(req: Request, res: Response) {
  const { token }: ReqDto = req.body;

  const decoded = await auth().verifyIdToken(token);

  let user = await User.findOne({ uid: decoded.uid });
  if (!user) {
    const prof = new Prof({
      attrs: [
        { k: "picture", v: decoded.picture },
        { k: "phone", v: decoded.phone_number },
        { k: "email", v: decoded.email },
      ],
    });

    user = new User({
      uid: decoded.uid,
      prof: prof._id,
    });

    await prof.save();
    await user.save();
  }

  const accessToken = sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "10m" }
  );

  res.json({
    decoded: decoded,
    accessToken,
    user,
  });
}

export { signIn };
