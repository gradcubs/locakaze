
import express from 'express';
import { getApplicationById, updateApplication } from '../services/database';
import { CreditResponse } from '../types';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreditResponse:
 *       type: object
 *       properties:
 *         approved:
 *           type: boolean
 *         creditLimit:
 *           type: string
 *         interestRate:
 *           type: string
 *         accountNumber:
 *           type: string
 *         reason:
 *           type: string
 */

/**
 * @swagger
 * /api/credit/evaluate/{applicationId}:
 *   post:
 *     summary: Evaluate a credit application
 *     tags: [Credit]
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Credit evaluation result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreditResponse'
 *       404:
 *         description: Application not found
 */
router.post('/evaluate/:applicationId', (req, res) => {
  const application = getApplicationById(req.params.applicationId);
  
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  // Mock credit evaluation logic
  // In a real app, this would involve complex scoring algorithms
  const creditScoreMap: any = {
    excellent: 800,
    good: 720,
    fair: 650,
    poor: 600,
    veryPoor: 550
  };
  
  const score = creditScoreMap[application.creditScore] || 650;
  const income = parseInt(application.income, 10) || 0;
  const requestedAmount = parseInt(application.loanAmount, 10) || 0;
  
  let result: CreditResponse;
  let newStatus: 'approved' | 'rejected';
  
  if (score >= 700 && income >= 50000) {
    // Approve with high limit
    const limit = Math.min(requestedAmount * 1.5, income * 0.2);
    const rate = 9.99 + (Math.random() * 2).toFixed(2);
    const accountNumber = `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`;
    
    result = {
      approved: true,
      creditLimit: `$${limit.toFixed(0)}`,
      interestRate: `${rate}% APR`,
      accountNumber
    };
    newStatus = 'approved';
  } else if (score >= 630 && income >= 30000) {
    // Approve with requested limit
    const limit = Math.min(requestedAmount, income * 0.15);
    const rate = 12.99 + (Math.random() * 3).toFixed(2);
    const accountNumber = `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`;
    
    result = {
      approved: true,
      creditLimit: `$${limit.toFixed(0)}`,
      interestRate: `${rate}% APR`,
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
  updateApplication(application.applicationId, {
    status: newStatus,
    creditLimit: result.creditLimit,
    interestRate: result.interestRate,
    accountNumber: result.accountNumber
  });
  
  res.json(result);
});

/**
 * @swagger
 * /api/credit/check-status/{applicationId}:
 *   get:
 *     summary: Check the status of a credit application
 *     tags: [Credit]
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application status
 *       404:
 *         description: Application not found
 */
router.get('/check-status/:applicationId', (req, res) => {
  const application = getApplicationById(req.params.applicationId);
  
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  const result = application.status === 'approved' ? {
    approved: true,
    creditLimit: application.creditLimit,
    interestRate: application.interestRate,
    accountNumber: application.accountNumber
  } : undefined;
  
  res.json({
    applicationId: application.applicationId,
    status: application.status,
    message: getStatusMessage(application.status),
    updatedAt: application.updatedAt,
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
