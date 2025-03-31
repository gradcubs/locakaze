
import { v4 as uuidv4 } from 'uuid';

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  employmentStatus: string;
  annualIncome: number;
  loanPurpose: string;
  loanAmount: number;
}

export interface Application extends ApplicationFormData {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  mlDecision?: {
    status: 'approved' | 'rejected';
    interestRate: number;
    creditLimit: number;
  };
  creditCheck?: {
    creditScore: number;
    inquiries: number;
    utilization: number;
  };
}

// Submit a new application
export const submitApplication = async (formData: ApplicationFormData): Promise<Application> => {
  try {
    const response = await fetch('http://localhost:5000/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit application');
    }

    return response.json();
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

// Fetch all applications
export const fetchApplications = async (): Promise<Application[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/applications');
    
    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

// Fetch a single application by ID
export const fetchApplicationById = async (id: string): Promise<Application> => {
  try {
    const response = await fetch(`http://localhost:5000/api/applications/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch application');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching application:', error);
    throw error;
  }
};

// Update application status
export const updateApplicationStatus = async (id: string, status: 'approved' | 'rejected'): Promise<Application> => {
  try {
    const response = await fetch(`http://localhost:5000/api/applications/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update application status');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

// Let's add a function to create a mock application for testing
export const createMockApplication = (): Application => {
  return {
    id: uuidv4(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    employmentStatus: 'Employed',
    annualIncome: 75000,
    loanPurpose: 'Home Improvement',
    loanAmount: 25000,
    status: 'pending',
    createdAt: new Date().toISOString(),
    mlDecision: {
      status: 'approved',
      interestRate: 7.5,
      creditLimit: 35000,
    },
    creditCheck: {
      creditScore: 720,
      inquiries: 2,
      utilization: 25,
    },
  };
};
