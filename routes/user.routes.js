import express from "express";
import { User } from "../models/user.model.js";

const router = express.Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        await User.create({
            fullName,
            email,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        console.error("Signup Error:", error); // Add this line for debugging
        return res.render("signup", {
            error: "Email already exists. Please use a different email or sign in.",
        });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        console.error("Signin Error:", error); // Add this line for debugging
        return res.render('signin', {
            error: "Incorrect Email or password",
            user: req.user,
        });
    }
});


router.get('/logout', (req, res)=>{
    res.clearCookie('token').redirect('/')
})


export default router;
