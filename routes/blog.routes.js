import express from "express";
import { Blog } from "../models/blog.model.js";
import multer from "multer";
import path from "path";
import { Comment } from "../models/comment.model.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    return res.render("addBlog");
});

router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy");
        const comments = await Comment.find({
            blogId: req.params.id,
        }).populate("createdBy");
        console.log(comments)
        if (!blog) {
            return res.status(404).render("404");
        }
        return res.render("blog", {
            blog,
            comments,
        });
    } catch (error) {
        // Handle cases where the ID is invalid
        return res.status(404).render("404");
    }
});

router.post("/comment/:blogId", async (req, res) => {
    try {
        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        const blog = await Blog.findById(req.params.blogId).populate(
            "createdBy"
        );
        const comments = await Comment.find({
            blogId: req.params.blogId,
        }).populate("createdBy");
        return res.render("blog", {
            blog,
            comments,
            error: "Comment cannot be empty.",
        });
    }
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    try {
        const { title, body } = req.body;
        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverImageURL: `/uploads/${req.file.filename}`,
        });
        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        res.render("addBlog", {
            error: "All fields are required.",
        });
    }
});

export default router;
