
import axios from 'axios';

// Define the application type to ensure type safety
export interface Application {
  id: string;
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
  status: string;
  createdAt: string;
  mlDecision?: {
    status: string;
    interestRate: number;
    creditLimit: number;
  };
  creditCheck?: {
    creditScore: number;
    inquiries: number;
    utilization: number;
  };
}

// Base service URL - would point to real API in production
const API_URL = '/api';

// Mock applications data for development
const mockApplications: Application[] = [
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
];

// Initialize mock service
const api = {
  get: (url: string) => {
    console.log(`Mock API GET: ${url}`);
    
    // Handle applications list request
    if (url === '/applications') {
      return Promise.resolve({ data: mockApplications });
    }
    
    // Handle single application request
    if (url.includes('/applications/')) {
      const id = url.split('/applications/')[1].split('/')[0];
      const application = mockApplications.find(app => app.id === id);
      
      if (!application) {
        return Promise.reject(new Error('Application not found'));
      }
      
      return Promise.resolve({ data: application });
    }
    
    return Promise.reject(new Error('Not found'));
  },
  post: (url: string, data: any) => {
    console.log(`Mock API POST: ${url}`, data);
    
    if (url === '/applications') {
      // Create a new mock application
      const newApplication: Application = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        createdAt: new Date().toISOString(),
        mlDecision: {
          status: Math.random() > 0.3 ? 'approved' : 'rejected',
          interestRate: 5 + Math.random() * 10,
          creditLimit: Math.round((data.loanAmount * (1 + Math.random())) / 1000) * 1000
        },
        creditCheck: {
          creditScore: Math.floor(580 + Math.random() * 300),
          inquiries: Math.floor(Math.random() * 8),
          utilization: Math.floor(Math.random() * 90)
        }
      };
      
      return Promise.resolve({ data: newApplication });
    }
    
    return Promise.reject(new Error('Not found'));
  },
  put: (url: string, data: any) => {
    console.log(`Mock API PUT: ${url}`, data);
    
    if (url.includes('/applications/') && url.includes('/status')) {
      const id = url.split('/applications/')[1].split('/')[0];
      const application = mockApplications.find(app => app.id === id);
      
      if (!application) {
        return Promise.reject(new Error('Application not found'));
      }
      
      // Update application status
      application.status = data.status;
      
      return Promise.resolve({ data: application });
    }
    
    return Promise.reject(new Error('Not found'));
  }
};

// Application service methods
export const fetchApplications = async (): Promise<Application[]> => {
  try {
    // This would be a real API call in production
    // const response = await axios.get(`${API_URL}/applications`);
    const response = await api.get('/applications');
    return response.data as Application[];
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

export const fetchApplicationById = async (id: string): Promise<Application | null> => {
  try {
    // This would be a real API call in production
    // const response = await axios.get(`${API_URL}/applications/${id}`);
    const response = await api.get(`/applications/${id}`);
    return response.data as Application;
  } catch (error) {
    console.error(`Error fetching application ${id}:`, error);
    throw error;
  }
};

export const submitApplication = async (formData: any): Promise<Application> => {
  try {
    // This would be a real API call in production
    // const response = await axios.post(`${API_URL}/applications`, formData);
    const response = await api.post('/applications', formData);
    return response.data as Application;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (id: string, status: string): Promise<Application> => {
  try {
    // This would be a real API call in production
    // const response = await axios.put(`${API_URL}/applications/${id}/status`, { status });
    const response = await api.put(`/applications/${id}/status`, { status });
    return response.data as Application;
  } catch (error) {
    console.error(`Error updating application ${id} status:`, error);
    throw error;
  }
};
