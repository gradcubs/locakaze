
import React from 'react';

interface ApprovalStatusProps {
  status: 'processing' | 'approved' | 'rejected';
  message: string;
}

const ApprovalStatus: React.FC<ApprovalStatusProps> = ({ status, message }) => {
  const renderIcon = () => {
    if (status === 'processing') {
      return (
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    } else if (status === 'approved') {
      return (
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      );
    }
  };

  const getStatusText = () => {
    if (status === 'processing') return 'Processing';
    if (status === 'approved') return 'Approved';
    return 'Not Approved';
  };

  const getStatusClass = () => {
    if (status === 'processing') return 'text-primary';
    if (status === 'approved') return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="animate-scale-in flex flex-col items-center text-center">
      {renderIcon()}
      <h3 className={`text-2xl font-semibold mt-4 ${getStatusClass()}`}>
        {getStatusText()}
      </h3>
      <p className="mt-2 text-muted-foreground max-w-md">{message}</p>
    </div>
  );
};

export default ApprovalStatus;
