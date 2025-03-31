
import { v4 as uuidv4 } from 'uuid';

// Simulated database with mock applications data
export const db = {
  applications: [
    {
      id: '1234-abcd-5678-efgh',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      address: '123 Main Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      employmentStatus: 'Full-Time',
      annualIncome: 85000,
      loanPurpose: 'Home Improvement',
      loanAmount: 25000,
      status: 'pending',
      createdAt: '2023-05-15T10:30:00.000Z',
      mlDecision: {
        status: 'approved',
        interestRate: 8.75,
        creditLimit: 30000
      },
      creditCheck: {
        creditScore: 720,
        inquiries: 2,
        utilization: 25
      }
    },
    {
      id: '5678-ijkl-9012-mnop',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '(555) 987-6543',
      address: '456 Oak Avenue',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      employmentStatus: 'Part-Time',
      annualIncome: 45000,
      loanPurpose: 'Debt Consolidation',
      loanAmount: 15000,
      status: 'approved',
      createdAt: '2023-05-10T14:45:00.000Z',
      mlDecision: {
        status: 'approved',
        interestRate: 10.25,
        creditLimit: 18000
      },
      creditCheck: {
        creditScore: 680,
        inquiries: 3,
        utilization: 40
      }
    },
    {
      id: '9012-qrst-3456-uvwx',
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.johnson@example.com',
      phone: '(555) 555-5555',
      address: '789 Pine Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      employmentStatus: 'Self-Employed',
      annualIncome: 110000,
      loanPurpose: 'Business Expansion',
      loanAmount: 50000,
      status: 'rejected',
      createdAt: '2023-05-05T09:15:00.000Z',
      mlDecision: {
        status: 'rejected',
        interestRate: 12.5,
        creditLimit: 0
      },
      creditCheck: {
        creditScore: 620,
        inquiries: 7,
        utilization: 75
      }
    }
  ],
  users: [
    {
      id: uuidv4(),
      email: 'admin@example.com',
      password: 'password123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'employee'
    },
    {
      id: uuidv4(),
      email: 'user@example.com',
      password: 'password123',
      firstName: 'Regular',
      lastName: 'User',
      role: 'applicant'
    }
  ]
};
