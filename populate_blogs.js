import mongoose from 'mongoose';
import { Blog } from './models/blog.model.js';
import { User } from './models/user.model.js';
import { createHmac, randomBytes } from 'crypto';

const MONGODB_URI = 'mongodb://localhost:27017/blogify';

async function generateHashedPassword(password) {
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return { salt, hashedPassword };
}

const sampleBlogs = [
    {
        title: 'The Future of AI in Software Development',
        body: 'Artificial intelligence is rapidly transforming the landscape of software development, offering new tools and methodologies that enhance efficiency and innovation. From AI-powered code generation to intelligent debugging assistants, the integration of AI is set to revolutionize how developers work.',
        coverImageURL: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        title: 'Mastering React Hooks: A Comprehensive Guide',
        body: 'React Hooks have changed the way we write functional components, making state management and side effects easier to handle. This guide covers everything from `useState` and `useEffect` to custom hooks, providing practical examples and best practices for building robust React applications.',
        coverImageURL: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        title: 'Demystifying Microservices Architecture',
        body: 'Microservices architecture has become a popular choice for building scalable and resilient applications. This article explores the core principles, benefits, and challenges of adopting a microservices approach, along with tips for designing and deploying your services effectively.',
        coverImageURL: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        title: 'The Importance of Clean Code in Software Engineering',
        body: 'Clean code is not just about aesthetics; it\'s about maintainability, readability, and collaboration. This post delves into the principles of writing clean, understandable, and efficient code, emphasizing its long-term benefits for individual developers and teams.',
        coverImageURL: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        title: 'Getting Started with Node.js and Express.js',
        body: 'Node.js and Express.js form a powerful combination for building fast and scalable web applications. This tutorial walks you through setting up a basic Express.js server, handling routes, and integrating with a database, providing a solid foundation for your backend projects.',
        coverImageURL: 'https://images.pexels.com/photos/1089452/pexels-photo-1089452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
];

async function populateBlogs() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected for data population.');

        // Create a dummy user if one doesn't exist
        let dummyUser = await User.findOne({ email: 'dummy@example.com' });
        if (!dummyUser) {
            const { salt, hashedPassword } = await generateHashedPassword('password123');
            dummyUser = await User.create({
                fullName: 'Dummy User',
                email: 'dummy@example.com',
                salt: salt,
                password: hashedPassword,
                profileImageURL: '/images/profile.jpg',
                role: 'USER'
            });
            console.log('Dummy user created:', dummyUser.fullName);
        } else {
            console.log('Dummy user already exists:', dummyUser.fullName);
        }

        // Optional: Clear existing blogs before populating
        await Blog.deleteMany({});
        console.log('Existing blogs cleared.');

        const blogsWithUser = sampleBlogs.map(blog => ({
            ...blog,
            createdBy: dummyUser._id
        }));

        await Blog.insertMany(blogsWithUser);
        console.log('Sample blog posts populated successfully!');
    } catch (error) {
        console.error('Error populating blogs:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
}

populateBlogs();