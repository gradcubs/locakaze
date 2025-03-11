
import express from 'express';
import { 
  getAllApplications, 
  getApplicationById, 
  getApplicationsByEmail, 
  createApplication, 
  updateApplication 
} from '../services/database';
import { ApplicationRequest } from '../types';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ApplicationData:
 *       type: object
 *       properties:
 *         applicationId:
 *           type: string
 *           description: Unique identifier for the application
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zip:
 *           type: string
 *         income:
 *           type: string
 *         employment:
 *           type: string
 *           enum: [fullTime, partTime, selfEmployed, retired, student, unemployed]
 *         creditScore:
 *           type: string
 *           enum: [excellent, good, fair, poor, veryPoor]
 *         loanAmount:
 *           type: string
 *         purpose:
 *           type: string
 *           enum: [emergency, homeImprovement, debtConsolidation, majorPurchase, education, medical, other]
 *         status:
 *           type: string
 *           enum: [pending, processing, approved, rejected]
 *         submittedAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         creditLimit:
 *           type: string
 *         interestRate:
 *           type: string
 *         accountNumber:
 *           type: string
 */

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ApplicationData'
 */
router.get('/', (req, res) => {
  const applications = getAllApplications();
  res.json(applications);
});

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationData'
 *       404:
 *         description: Application not found
 */
router.get('/:id', (req, res) => {
  const application = getApplicationById(req.params.id);
  
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  res.json(application);
});

/**
 * @swagger
 * /api/applications/user/{email}:
 *   get:
 *     summary: Get applications by user email
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ApplicationData'
 */
router.get('/user/:email', (req, res) => {
  const applications = getApplicationsByEmail(req.params.email);
  res.json(applications);
});

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Submit a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personalInfo:
 *                 type: object
 *               financialInfo:
 *                 type: object
 *               verification:
 *                 type: object
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Invalid application data
 */
router.post('/', (req, res) => {
  try {
    const applicationData = req.body as ApplicationRequest;
    
    if (!applicationData.personalInfo || !applicationData.financialInfo) {
      return res.status(400).json({ message: 'Invalid application data' });
    }
    
    const newApplication = createApplication(applicationData);
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ message: 'Error creating application', error });
  }
});

/**
 * @swagger
 * /api/applications/{id}:
 *   put:
 *     summary: Update application status
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Application updated successfully
 *       404:
 *         description: Application not found
 */
router.put('/:id', (req, res) => {
  const updatedApplication = updateApplication(req.params.id, req.body);
  
  if (!updatedApplication) {
    return res.status(404).json({ message: 'Application not found' });
  }
  
  res.json(updatedApplication);
});

export default router;
