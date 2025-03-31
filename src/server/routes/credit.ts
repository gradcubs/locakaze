
import express, { Request, Response } from 'express';
import { db } from '../services/database';

const router = express.Router();

// Interface for credit response
export interface CreditResponse {
  approved: boolean;
  creditLimit?: string;
  interestRate?: string;
  accountNumber?: string;
  reason?: string;
}

// Helper function to get application by ID
const getApplicationById = (id: string) => {
  return db.applications.find(app => app.id === id);
};

// Helper function to update application
const updateApplication = (id: string, updates: Partial<typeof db.applications[0]>) => {
  const index = db.applications.findIndex(app => app.id === id);
  if (index !== -1) {
    db.applications[index] = { ...db.applications[index], ...updates };
    return db.applications[index];
  }
  return null;
};

// Evaluate credit application
router.post('/evaluate/:applicationId', async (req: Request, res: Response) => {
  const application = getApplicationById(req.params.applicationId);
  
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  // Mock credit evaluation logic
  // In a real app, this would involve complex scoring algorithms
  const score = application.creditCheck?.creditScore || 650;
  const income = application.annualIncome || 0;
  const requestedAmount = application.loanAmount || 0;
  
  let result: CreditResponse;
  let newStatus: 'approved' | 'rejected';
  
  if (score >= 700 && income >= 50000) {
    // Approve with high limit
    const limit = Math.min(requestedAmount * 1.5, income * 0.2);
    const rate = 9.99 + (Math.random() * 2);
    const accountNumber = `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`;
    
    result = {
      approved: true,
      creditLimit: `$${limit.toFixed(0)}`,
      interestRate: `${rate.toFixed(2)}% APR`,
      accountNumber
    };
    newStatus = 'approved';
  } else if (score >= 630 && income >= 30000) {
    // Approve with requested limit
    const limit = Math.min(requestedAmount, income * 0.15);
    const rate = 12.99 + (Math.random() * 3);
    const accountNumber = `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`;
    
    result = {
      approved: true,
      creditLimit: `$${limit.toFixed(0)}`,
      interestRate: `${rate.toFixed(2)}% APR`,
      accountNumber
    };
    newStatus = 'approved';
  } else {
    // Reject
    result = {
      approved: false,
      reason: 'Credit score or income below required threshold'
    };
    newStatus = 'rejected';
  }
  
  // Update application in database
  updateApplication(application.id, {
    status: newStatus,
  });
  
  res.json(result);
});

// Check status of credit application
router.get('/check-status/:applicationId', async (req: Request, res: Response) => {
  const application = getApplicationById(req.params.applicationId);
  
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  const result = application.status === 'approved' ? {
    approved: true,
    creditLimit: application.mlDecision?.creditLimit.toString(),
    interestRate: `${application.mlDecision?.interestRate}% APR`,
    accountNumber: `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`
  } : undefined;
  
  res.json({
    applicationId: application.id,
    status: application.status,
    message: getStatusMessage(application.status),
    updatedAt: application.createdAt,
    result
  });
});

// Helper function to get status message
const getStatusMessage = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Your application has been received and is waiting for processing.';
    case 'processing':
      return 'Your application is currently being processed.';
    case 'approved':
      return 'Congratulations! Your credit application has been approved.';
    case 'rejected':
      return 'We regret to inform you that your application has been declined.';
    default:
      return 'Application status unknown.';
  }
};

export default router;
