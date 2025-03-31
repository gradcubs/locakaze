
import axios from 'axios';
import { db } from '../server/services/database';

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

// Initialize mock service
const api = {
  get: (url: string) => {
    // Convert URL to a path that matches our mock data structure
    if (url.includes('/applications/')) {
      const id = url.split('/applications/')[1].split('/')[0];
      const application = db.applications.find(app => app.id === id);
      return Promise.resolve({ data: application });
    }
    
    if (url === '/applications') {
      return Promise.resolve({ data: db.applications });
    }
    
    return Promise.reject(new Error('Not found'));
  },
  post: (url: string, data: any) => {
    if (url === '/applications') {
      // In a real app, this would send to the server
      // For now, we'll just mock a success response
      return Promise.resolve({ 
        data: {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          status: 'pending',
          createdAt: new Date().toISOString()
        } 
      });
    }
    
    return Promise.reject(new Error('Not found'));
  },
  put: (url: string, data: any) => {
    if (url.includes('/applications/') && url.includes('/status')) {
      const id = url.split('/applications/')[1].split('/')[0];
      // Find and update application status
      const applicationIndex = db.applications.findIndex(app => app.id === id);
      
      if (applicationIndex !== -1) {
        db.applications[applicationIndex].status = data.status;
        return Promise.resolve({ data: db.applications[applicationIndex] });
      }
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
    return response.data;
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
    return response.data;
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
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error(`Error updating application ${id} status:`, error);
    throw error;
  }
};
