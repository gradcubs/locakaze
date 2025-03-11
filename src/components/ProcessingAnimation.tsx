
import React, { useEffect, useState } from 'react';
import { CheckCircle, ClipboardCheck, Clock, FileText, RefreshCw, User } from 'lucide-react';

const ProcessingAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % (totalSteps + 1));
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  const steps = [
    { icon: <FileText className="h-6 w-6" />, label: "Application Submitted" },
    { icon: <RefreshCw className="h-6 w-6 animate-spin" />, label: "Processing Data" },
    { icon: <User className="h-6 w-6" />, label: "Verifying Identity" },
    { icon: <ClipboardCheck className="h-6 w-6" />, label: "Credit Assessment" },
    { icon: <Clock className="h-6 w-6" />, label: "Decision Making" },
    { icon: <CheckCircle className="h-6 w-6" />, label: "Approval Complete" }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto h-32 bg-white dark:bg-card rounded-xl shadow-md overflow-hidden border border-border/50">
      <div className="absolute top-0 left-0 w-full h-1 bg-secondary overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="flex justify-center items-center mb-3">
          {steps[currentStep].icon}
        </div>
        <div className="text-foreground font-medium text-center">
          {steps[currentStep].label}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Step {currentStep + 1} of {totalSteps + 1}
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;
