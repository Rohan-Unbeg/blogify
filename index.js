dotenv.config();
import path from "path";
import userRoute from "./routes/user.routes.js";
import blogRoute from "./routes/blog.routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookie } from "./middlewares/auth.middleware.js";
import { Blog } from "./models/blog.model.js";
import dotenv from "dotenv";
import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("mongodb connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
    try {
        const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
        res.render("home", {
            blogs: allBlogs,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).send("Error fetching blogs");
    }
});

app.listen(PORT, () => {
    console.log(`Server started at Port:${PORT}`);
});
