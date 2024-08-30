import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export function resetPassword(req, res) {
  res.send("its works!");
  console.log("router works");
}

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const alreadyPresent = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
    if (alreadyPresent) {
      return res.status(400).json({
        status: false,
        message: "user already exist, please login",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPass,
      },
    });
    if (newUser) {
      return res.json({
        staus: true,
        message: "user created successfully",
      });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const alreadyPresent = await prisma.user.findFirst({
      where: { email },
    });
    if (!alreadyPresent) {
      return res.json({
        status: false,
        message: "user does not exist, please signin to create an account",
      });
    }
    const isTruePassword = await bcrypt.compare(
      password,
      alreadyPresent.password
    );

    if (isTruePassword) {
      const token = jwt.sign(
        { id: alreadyPresent._id, secret: "Deadpool" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res
        .cookie("mytoken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 60,
        })
        .status(200)
        .json({ status: true, message: "user logged in ", token });
    }

    return res.json({
      status: false,
      message: "invalid email or password",
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
}

export function logout(req, res) {
  res.send("its works!");
  console.log("router works");
}
