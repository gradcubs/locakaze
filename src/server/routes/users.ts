
import express from 'express';
import { getUserByEmail, createUser } from '../services/database';
import { UserCredentials } from '../types';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         role:
 *           type: string
 *           enum: [applicant, employee]
 *         token:
 *           type: string
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body as UserCredentials;
  
  // Simple mock authentication
  // In a real app, this would validate password hash against the database
  if (email === 'employee@example.com' && password === 'password123') {
    const user = getUserByEmail(email) || {
      userId: 'usr_123',
      email: 'employee@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'employee'
    };
    
    // Generate a mock token
    const token = Buffer.from(`${user.email}:${Date.now()}`).toString('base64');
    
    res.json({
      ...user,
      token
    });
  } else if (email === 'john.doe@example.com' && password === 'password123') {
    const user = getUserByEmail(email) || {
      userId: 'usr_456',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'applicant'
    };
    
    // Generate a mock token
    const token = Buffer.from(`${user.email}:${Date.now()}`).toString('base64');
    
    res.json({
      ...user,
      token
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid user data or email already exists
 */
router.post('/register', (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  
  // Check if user already exists
  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  
  // In a real app, we would hash the password here
  
  try {
    const newUser = createUser({ email, firstName, lastName, role });
    
    // Generate a mock token
    const token = Buffer.from(`${newUser.email}:${Date.now()}`).toString('base64');
    
    res.status(201).json({
      ...newUser,
      token
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

export default router;
