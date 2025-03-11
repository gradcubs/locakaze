
import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import ApprovalStatus from './ApprovalStatus';
import LoadingState from './LoadingState';
import ApplicationSuccess from './ApplicationSuccess';

const ApplyForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'processing' | 'approved' | 'rejected' | null>(null);
  
  const steps = ["Personal Info", "Financial Info", "Verification", "Review"];
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    income: '',
    employment: '',
    creditScore: '',
    loanAmount: '',
    purpose: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final submit
      setLoading(true);
      
      // Simulate processing
      setTimeout(() => {
        setLoading(false);
        setStatus('approved');
      }, 3000);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-foreground">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-foreground">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="john.doe@example.com"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-foreground">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="(123) 456-7890"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="dob" className="block mb-2 text-sm font-medium text-foreground">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-foreground">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="123 Main St"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-foreground">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="New York"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block mb-2 text-sm font-medium text-foreground">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                >
                  <option value="" disabled>Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="IL">Illinois</option>
                </select>
              </div>
              <div>
                <label htmlFor="zip" className="block mb-2 text-sm font-medium text-foreground">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="10001"
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Financial Information</h2>
            
            <div className="mb-4">
              <label htmlFor="income" className="block mb-2 text-sm font-medium text-foreground">
                Annual Income
              </label>
              <input
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="60,000"
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Enter your gross annual income before taxes
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="employment" className="block mb-2 text-sm font-medium text-foreground">
                Employment Status
              </label>
              <select
                id="employment"
                name="employment"
                value={formData.employment}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              >
                <option value="" disabled>Select Status</option>
                <option value="fullTime">Full-time</option>
                <option value="partTime">Part-time</option>
                <option value="selfEmployed">Self-employed</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="creditScore" className="block mb-2 text-sm font-medium text-foreground">
                Credit Score Range
              </label>
              <select
                id="creditScore"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              >
                <option value="" disabled>Select Range</option>
                <option value="excellent">Excellent (720-850)</option>
                <option value="good">Good (690-719)</option>
                <option value="fair">Fair (630-689)</option>
                <option value="poor">Poor (580-629)</option>
                <option value="veryPoor">Very Poor (300-579)</option>
              </select>
              <p className="mt-1 text-xs text-muted-foreground">
                Providing your credit score range helps us determine appropriate credit options
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="loanAmount" className="block mb-2 text-sm font-medium text-foreground">
                  Requested Credit Limit
                </label>
                <input
                  type="number"
                  id="loanAmount"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="5,000"
                  required
                />
              </div>
              <div>
                <label htmlFor="purpose" className="block mb-2 text-sm font-medium text-foreground">
                  Primary Purpose
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                >
                  <option value="" disabled>Select Purpose</option>
                  <option value="emergency">Emergency Fund</option>
                  <option value="homeImprovement">Home Improvement</option>
                  <option value="debtConsolidation">Debt Consolidation</option>
                  <option value="majorPurchase">Major Purchase</option>
                  <option value="education">Education</option>
                  <option value="medical">Medical Expenses</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Verification</h2>
            
            <div className="bg-accent/50 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 mr-3">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <p className="text-sm text-muted-foreground">
                  To verify your identity and process your application, we need to collect some additional information.
                  All data is encrypted and securely stored.
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Identity Verification</h3>
              
              <div className="mb-4">
                <label htmlFor="ssn" className="block mb-2 text-sm font-medium text-foreground">
                  Social Security Number
                </label>
                <input
                  type="password"
                  id="ssn"
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="XXX-XX-XXXX"
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Your SSN is encrypted and used only for identity verification purposes
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Document Upload</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please upload a clear photo of your government-issued ID (driver's license, passport, etc.)
              </p>
              
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground mb-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or</p>
                <button className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                  Browse Files
                </button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, PDF (Max. 5MB)
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-4">
                <input
                  id="consent"
                  type="checkbox"
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-foreground">
                  I consent to a soft credit check (will not affect your credit score)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-foreground">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Review Your Application</h2>
            
            <div className="bg-white dark:bg-card shadow-sm rounded-lg border border-border p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{formData.dob}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-card shadow-sm rounded-lg border border-border p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Financial Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Annual Income</p>
                  <p className="font-medium">${formData.income}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employment Status</p>
                  <p className="font-medium">{formData.employment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Credit Score Range</p>
                  <p className="font-medium">{formData.creditScore}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Primary Purpose</p>
                  <p className="font-medium">{formData.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Requested Credit Limit</p>
                  <p className="font-medium">${formData.loanAmount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 mr-3">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <p className="text-sm text-muted-foreground">
                  By submitting your application, you authorize us to review your credit report and verify the information provided. This will be a soft credit inquiry and will not impact your credit score.
                </p>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <input
                id="confirm"
                type="checkbox"
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="confirm" className="ml-2 block text-sm text-foreground">
                I confirm that all information provided is accurate and complete
              </label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <LoadingState 
        messages={[
          "Verifying your identity...",
          "Checking your credit history...",
          "Calculating your pre-qualified offers...",
          "Finalizing your approval...",
        ]}
      />
    );
  }

  if (status === 'approved') {
    return (
      <ApplicationSuccess 
        creditAmount="$5,000"
        interestRate="11.99% APR"
        accountNumber="****-****-****-4321"
      />
    );
  }

  if (status === 'rejected') {
    return (
      <ApprovalStatus 
        status="rejected"
        message="We're sorry, we couldn't approve your application at this time. Please check your email for details and options to improve your chances of approval in the future."
      />
    );
  }

  if (status === 'processing') {
    return (
      <ApprovalStatus 
        status="processing"
        message="We're currently processing your application. This usually takes 1-2 business days. We'll notify you by email once a decision has been made."
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator currentStep={step} steps={steps} />
      
      <form onSubmit={handleContinue} className="bg-white dark:bg-card shadow-sm border border-border rounded-2xl p-6 md:p-8">
        {renderFormStep()}
        
        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 border border-border rounded-xl text-foreground font-medium hover:bg-secondary/50 transition-colors"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200"
          >
            {step === steps.length - 1 ? 'Submit Application' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
