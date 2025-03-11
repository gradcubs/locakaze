
export interface ApplicantInfo {
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

export interface FinancialInfo {
  income: string;
  employment: string;
  creditScore: string;
  loanAmount: string;
  purpose: string;
}

export interface VerificationInfo {
  ssn?: string;
  idDocument?: string;
  consentToCheck: boolean;
  termsAgreed: boolean;
}

export interface ApplicationData extends ApplicantInfo, FinancialInfo {
  applicationId: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  submittedAt: string;
  updatedAt: string;
  creditLimit?: string;
  interestRate?: string;
  accountNumber?: string;
  verification?: VerificationInfo;
}

export interface ApplicationRequest {
  personalInfo: ApplicantInfo;
  financialInfo: FinancialInfo;
  verification: VerificationInfo;
}

export interface CreditResponse {
  approved: boolean;
  creditLimit?: string;
  interestRate?: string;
  accountNumber?: string;
  reason?: string;
}

export interface ApplicationStatusResponse {
  applicationId: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  message: string;
  updatedAt: string;
  result?: CreditResponse;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'applicant' | 'employee';
  token?: string;
}
