import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { Blog } from './models/blog.model.js';
import { User } from './models/user.model.js';

const MONGODB_URI = 'mongodb://localhost:27017/blogify';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);

        // Clear existing data
        await Blog.deleteMany({});

        // Get all users
        const users = await User.find();

        if (users.length === 0) {
            console.log('No users found. Please create some users first.');
            return;
        }

        const imagePool = [
            'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1516116216624-53e697320f34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        ];

        const blogs = [];
        for (let i = 0; i < 10; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const blog = new Blog({
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs(5),
                createdBy: randomUser._id,
                coverImageURL: imagePool[i],
            });
            blogs.push(blog);
        }

        await Blog.insertMany(blogs);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.disconnect();
    }
};

seedDatabase();
