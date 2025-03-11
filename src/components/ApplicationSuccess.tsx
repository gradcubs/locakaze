
import React from 'react';

interface ApplicationSuccessProps {
  creditAmount: string;
  interestRate: string;
  accountNumber: string;
}

const ApplicationSuccess: React.FC<ApplicationSuccessProps> = ({ 
  creditAmount, 
  interestRate, 
  accountNumber 
}) => {
  return (
    <div className="animate-fade-in w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Congratulations!</h2>
        <p className="text-muted-foreground">Your line of credit has been approved and is ready to use.</p>
      </div>

      <div className="bg-white dark:bg-card shadow-sm rounded-2xl border border-border p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Credit Details</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Credit Limit</span>
            <span className="text-xl font-semibold">{creditAmount}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Interest Rate</span>
            <span className="text-lg font-medium">{interestRate}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Account Number</span>
            <span className="font-medium">{accountNumber}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
          Access Your Account
        </button>
        <button className="w-full py-3 bg-secondary text-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors">
          Download Agreement
        </button>
      </div>
    </div>
  );
};

export default ApplicationSuccess;
