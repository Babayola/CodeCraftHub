const request = require('supertest');
const app = require('../src/app'); // Your main app
const mongoose = require('mongoose');
const User = require('../src/models/userModel');

beforeAll(async () => {
    // Connect to MongoDB specifically for tests
    // Use a separate test database if possible, or ensure it cleans up
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Clean up test data after all tests are done
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('User Service', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register') // Notice the /api/users prefix
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    it('should login an existing user', async () => {
        // Ensure user exists first (e.g., from a previous test or setup)
        // For this example, we register again to ensure it's fresh
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser_login', // Use a different username to avoid unique constraint error
                email: 'test_login@example.com',
                password: 'password123',
            });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test_login@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });
});