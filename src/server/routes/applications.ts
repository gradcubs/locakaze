
import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../services/database';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - address
 *         - city
 *         - state
 *         - zipCode
 *         - employmentStatus
 *         - annualIncome
 *         - loanPurpose
 *         - loanAmount
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the application
 *         firstName:
 *           type: string
 *           description: First name of the applicant
 *         lastName:
 *           type: string
 *           description: Last name of the applicant
 *         email:
 *           type: string
 *           description: Email of the applicant
 *         phone:
 *           type: string
 *           description: Phone number of the applicant
 *         address:
 *           type: string
 *           description: Street address of the applicant
 *         city:
 *           type: string
 *           description: City of the applicant
 *         state:
 *           type: string
 *           description: State of the applicant
 *         zipCode:
 *           type: string
 *           description: Zip code of the applicant
 *         employmentStatus:
 *           type: string
 *           description: Employment status of the applicant
 *         annualIncome:
 *           type: number
 *           description: Annual income of the applicant
 *         loanPurpose:
 *           type: string
 *           description: Purpose of the loan
 *         loanAmount:
 *           type: number
 *           description: Requested loan amount
 *         status:
 *           type: string
 *           description: Current status of the application
 *           enum:
 *             - pending
 *             - approved
 *             - rejected
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the application was created
 *         mlDecision:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum:
 *                 - approved
 *                 - rejected
 *             interestRate:
 *               type: number
 *             creditLimit:
 *               type: number
 *         creditCheck:
 *           type: object
 *           properties:
 *             creditScore:
 *               type: number
 *             inquiries:
 *               type: number
 *             utilization:
 *               type: number
 */

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: API for managing loan applications
 */

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: The list of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
router.get('/', (_req: Request, res: Response) => {
  res.json(db.applications);
});

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get an application by id
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The application id
 *     responses:
 *       200:
 *         description: The application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       404:
 *         description: Application not found
 */
router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const application = db.applications.find(app => app.id === req.params.id);
  
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  return res.json(application);
});

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
 *         description: The created application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 */
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

/**
 * @swagger
 * /api/applications/{id}/status:
 *   put:
 *     summary: Update the status of an application
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The application id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - approved
 *                   - rejected
 *     responses:
 *       200:
 *         description: The updated application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       404:
 *         description: Application not found
 */
router.put('/:id/status', (req: Request<{ id: string }>, res: Response) => {
  const { status } = req.body;
  const applicationIndex = db.applications.findIndex(app => app.id === req.params.id);
  
  if (applicationIndex === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  db.applications[applicationIndex].status = status;
  
  return res.json(db.applications[applicationIndex]);
});

export default router;
