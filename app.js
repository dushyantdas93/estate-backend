import express from "express";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
const PORT = 8800;
const app = express();

// app.use(bodyparser());
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use("/api/post", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is running On ${PORT}`);
});
