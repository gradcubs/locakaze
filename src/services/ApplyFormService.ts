import { toast } from "@/components/ui/use-toast";

const API_URL = 'http://localhost:5000/api';

// Types
interface ApplicantInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface FinancialInfo {
  income: string;
  employment: string;
  creditScore: string;
  loanAmount: string;
  purpose: string;
}

interface VerificationInfo {
  ssn?: string;
  idDocument?: string;
  consentToCheck: boolean;
  termsAgreed: boolean;
}

interface ApplicationRequest {
  personalInfo: ApplicantInfo;
  financialInfo: FinancialInfo;
  verification: VerificationInfo;
}

interface ApplicationResponse {
  applicationId: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  submittedAt: string;
  updatedAt: string;
  // ... other fields
}

// Service methods
export const submitApplication = async (formData: any): Promise<ApplicationResponse> => {
  try {
    const applicationData: ApplicationRequest = {
      personalInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip
      },
      financialInfo: {
        income: formData.income,
        employment: formData.employment,
        creditScore: formData.creditScore,
        loanAmount: formData.loanAmount,
        purpose: formData.purpose
      },
      verification: {
        ssn: formData.ssn,
        consentToCheck: true, // From form checkbox
        termsAgreed: true // From form checkbox
      }
    };
    
    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(applicationData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error submitting application');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Application submission error:', error);
    toast({
      title: 'Submission Error',
      description: error instanceof Error ? error.message : 'Failed to submit application',
      variant: 'destructive'
    });
    throw error;
  }
};

export const getApplicationStatus = async (applicationId: string) => {
  try {
    const response = await fetch(`${API_URL}/credit/check-status/${applicationId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error checking application status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Status check error:', error);
    toast({
      title: 'Status Check Error',
      description: error instanceof Error ? error.message : 'Failed to check application status',
      variant: 'destructive'
    });
    throw error;
  }
};

export const getAllApplications = async () => {
  try {
    const response = await fetch(`${API_URL}/applications`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching applications');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch applications error:', error);
    toast({
      title: 'Fetch Error',
      description: error instanceof Error ? error.message : 'Failed to fetch applications',
      variant: 'destructive'
    });
    throw error;
  }
};

export const getApplicationById = async (applicationId: string) => {
  try {
    const response = await fetch(`${API_URL}/applications/${applicationId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching application details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch application error:', error);
    toast({
      title: 'Fetch Error',
      description: error instanceof Error ? error.message : 'Failed to fetch application details',
      variant: 'destructive'
    });
    throw error;
  }
};

export const evaluateApplication = async (applicationId: string) => {
  try {
    const response = await fetch(`${API_URL}/credit/evaluate/${applicationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error evaluating application');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Evaluation error:', error);
    toast({
      title: 'Evaluation Error',
      description: error instanceof Error ? error.message : 'Failed to evaluate application',
      variant: 'destructive'
    });
    throw error;
  }
};
