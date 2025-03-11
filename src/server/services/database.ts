
import { ApplicationData, UserResponse, ApplicationRequest } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock database
const applications: ApplicationData[] = [
  {
    applicationId: '1a2b3c',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    dob: '1985-05-15',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    income: '75000',
    employment: 'fullTime',
    creditScore: 'good',
    loanAmount: '10000',
    purpose: 'debtConsolidation',
    status: 'approved',
    submittedAt: '2023-05-10T14:30:00Z',
    updatedAt: '2023-05-12T09:15:00Z',
    creditLimit: '$10,000',
    interestRate: '12.5% APR',
    accountNumber: '****-****-****-1234'
  },
  {
    applicationId: '2c3d4e',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(234) 567-8901',
    dob: '1990-08-22',
    address: '456 Oak Ave',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    income: '60000',
    employment: 'selfEmployed',
    creditScore: 'fair',
    loanAmount: '5000',
    purpose: 'emergency',
    status: 'processing',
    submittedAt: '2023-05-15T10:45:00Z',
    updatedAt: '2023-05-15T11:30:00Z'
  },
  {
    applicationId: '3e4f5g',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    phone: '(345) 678-9012',
    dob: '1975-03-30',
    address: '789 Pine St',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    income: '45000',
    employment: 'partTime',
    creditScore: 'poor',
    loanAmount: '3000',
    purpose: 'medical',
    status: 'rejected',
    submittedAt: '2023-05-14T16:20:00Z',
    updatedAt: '2023-05-16T14:10:00Z'
  }
];

const users: UserResponse[] = [
  {
    userId: 'usr_123',
    email: 'employee@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'employee'
  },
  {
    userId: 'usr_456',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'applicant'
  }
];

// Database methods
export const getAllApplications = () => {
  return [...applications];
};

export const getApplicationById = (id: string) => {
  return applications.find(app => app.applicationId === id);
};

export const getApplicationsByEmail = (email: string) => {
  return applications.filter(app => app.email === email);
};

export const createApplication = (data: ApplicationRequest): ApplicationData => {
  const applicationId = uuidv4();
  const now = new Date().toISOString();
  
  const newApplication: ApplicationData = {
    applicationId,
    ...data.personalInfo,
    ...data.financialInfo,
    status: 'pending',
    submittedAt: now,
    updatedAt: now,
    verification: data.verification
  };
  
  applications.push(newApplication);
  return newApplication;
};

export const updateApplication = (id: string, data: Partial<ApplicationData>): ApplicationData | null => {
  const index = applications.findIndex(app => app.applicationId === id);
  
  if (index === -1) return null;
  
  applications[index] = {
    ...applications[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  return applications[index];
};

export const getUserByEmail = (email: string) => {
  return users.find(user => user.email === email);
};

export const createUser = (userData: Partial<UserResponse>): UserResponse => {
  const newUser: UserResponse = {
    userId: uuidv4(),
    email: userData.email || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    role: userData.role || 'applicant'
  };
  
  users.push(newUser);
  return newUser;
};

// Add missing uuid dependency
export const installUuid = () => {
  // This is just a placeholder function to indicate we need to install uuid
  // The actual installation will be done separately
};
