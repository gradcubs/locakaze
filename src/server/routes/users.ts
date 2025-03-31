
import express, { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../services/database';

const router = Router();

// Helper functions
const getUserByEmail = (email: string) => {
  return db.users.find(user => user.email === email);
};

const createUser = (userData: Omit<typeof db.users[0], 'id'>) => {
  const newUser = {
    id: uuidv4(),
    ...userData
  };
  db.users.push(newUser);
  return newUser;
};

// Login route
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      message: 'Email and password are required' 
    });
  }
  
  const user = getUserByEmail(email);
  
  if (!user) {
    return res.status(401).json({ 
      message: 'Invalid credentials' 
    });
  }
  
  // In a real app, we would compare hashed passwords
  if (user.password !== password) {
    return res.status(401).json({ 
      message: 'Invalid credentials' 
    });
  }
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  
  return res.json({
    message: 'Login successful',
    user: userWithoutPassword,
    token: `mock-jwt-token-${user.id}`
  });
});

// Register route
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role = 'user' } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      message: 'Email and password are required' 
    });
  }
  
  // Check if user already exists
  const existingUser = getUserByEmail(email);
  
  if (existingUser) {
    return res.status(409).json({ 
      message: 'User with this email already exists' 
    });
  }
  
  // Create new user
  const newUser = createUser({
    email,
    password, // In a real app, this would be hashed
    firstName,
    lastName,
    role
  });
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser;
  
  return res.status(201).json({
    message: 'Registration successful',
    user: userWithoutPassword
  });
});

export default router;
