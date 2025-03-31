
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../services/database';

const router = express.Router();

// Helper functions for user operations
const getUserByEmail = (email: string) => {
  return db.users.find(user => user.email === email);
};

const createUser = (userData: { email: string; password: string; firstName: string; lastName: string; role: string }) => {
  const newUser = { ...userData, id: uuidv4() };
  db.users.push(newUser);
  return newUser;
};

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
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
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
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role } = req.body;
  
  // Check if user already exists
  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  
  // In a real app, we would hash the password here
  
  try {
    const newUser = createUser({ email, password, firstName, lastName, role });
    
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
