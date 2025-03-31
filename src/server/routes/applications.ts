
import express, { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../services/database';

const router = Router();

// Shortened version for clarity, focusing on the route handlers

router.get('/', (req: Request, res: Response) => {
  res.json(db.applications);
});

router.get('/:id', (req: Request, res: Response) => {
  const application = db.applications.find(app => app.id === req.params.id);
  
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  return res.json(application);
});

router.post('/', (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    employmentStatus,
    annualIncome,
    loanPurpose,
    loanAmount
  } = req.body;

  // Generate random ML decision with mostly approval
  const approveProbability = Math.random();
  const mlStatus = approveProbability > 0.3 ? 'approved' : 'rejected';
  const interestRate = 5 + Math.random() * 10;
  const creditLimit = Math.round((loanAmount * (1 + Math.random())) / 1000) * 1000;

  // Generate random credit check data
  const creditScore = Math.floor(580 + Math.random() * 300);
  const inquiries = Math.floor(Math.random() * 8);
  const utilization = Math.floor(Math.random() * 90);

  const newApplication = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    employmentStatus,
    annualIncome,
    loanPurpose,
    loanAmount,
    status: 'pending',
    createdAt: new Date().toISOString(),
    mlDecision: {
      status: mlStatus,
      interestRate: parseFloat(interestRate.toFixed(2)),
      creditLimit
    },
    creditCheck: {
      creditScore,
      inquiries,
      utilization
    }
  };

  db.applications.push(newApplication);
  
  return res.status(201).json(newApplication);
});

router.put('/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const applicationIndex = db.applications.findIndex(app => app.id === req.params.id);
  
  if (applicationIndex === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  db.applications[applicationIndex].status = status;
  
  return res.json(db.applications[applicationIndex]);
});

export default router;
