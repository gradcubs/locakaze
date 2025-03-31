
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, CreditCard, Percent, DollarSign, AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { ApprovalDecisionDialog } from '@/components/ApprovalDecisionDialog';
import { Application } from '@/services/ApplyFormService';
import { ScrollArea } from '@/components/ui/scroll-area';

// Static sample application data
const sampleApplication: Application = {
  id: "APP-12345",
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@example.com",
  phone: "(555) 123-4567",
  address: "123 Main Street",
  city: "San Francisco",
  state: "California",
  zipCode: "94105",
  employmentStatus: "Employed",
  annualIncome: 85000,
  loanPurpose: "Home Improvement",
  loanAmount: 25000,
  status: "pending",
  createdAt: new Date().toISOString(),
  mlDecision: {
    status: "approved",
    interestRate: 7.5,
    creditLimit: 30000,
    confidenceScore: 0.85
  },
  creditCheck: {
    creditScore: 720,
    inquiries: 2,
    utilization: 25,
    accountHistory: "Good standing across all accounts"
  }
};

const ApplicationDetail = () => {
  const navigate = useNavigate();
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [application, setApplication] = useState<Application>(sampleApplication);
  
  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleApprovalConfirm = async () => {
    try {
      // Update the status locally for demo purposes
      setApplication({
        ...application,
        status: 'approved'
      });
      
      toast({
        title: "Application Approved",
        description: "The application has been successfully approved.",
        variant: "default",
      });
      setShowApproveDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const handleRejectionConfirm = async () => {
    try {
      // Update the status locally for demo purposes
      setApplication({
        ...application,
        status: 'rejected'
      });
      
      toast({
        title: "Application Rejected",
        description: "The application has been rejected.",
        variant: "default",
      });
      setShowRejectDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getComparativeBadge = (value: number, threshold: number, higherIsBetter: boolean) => {
    const isBetter = higherIsBetter ? value >= threshold : value <= threshold;
    return isBetter ? 
      <Badge className="bg-green-500 ml-2">{value}</Badge> : 
      <Badge variant="destructive" className="ml-2">{value}</Badge>;
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <div className="mb-4 flex items-center">
        <Button onClick={handleBack} variant="outline" size="sm" className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Application Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Left side - Application Information with scrolling */}
        <div className="md:col-span-1 h-full">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Applicant Information</CardTitle>
              <CardDescription>Details about the applicant</CardDescription>
            </CardHeader>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 pr-4 pb-6">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Application ID</h3>
                  <p className="text-foreground">{application.id}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Full Name</h3>
                  <p className="text-foreground">{application.firstName} {application.lastName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Email</h3>
                  <p className="text-foreground">{application.email}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Phone</h3>
                  <p className="text-foreground">{application.phone}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Address</h3>
                  <p className="text-foreground">{application.address}</p>
                  <p className="text-foreground">{application.city}, {application.state} {application.zipCode}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Employment Status</h3>
                  <p className="text-foreground">{application.employmentStatus}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Annual Income</h3>
                  <p className="text-foreground">${application.annualIncome.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Loan Purpose</h3>
                  <p className="text-foreground">{application.loanPurpose}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Loan Amount</h3>
                  <p className="text-foreground">${application.loanAmount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Application Date</h3>
                  <p className="text-foreground">{new Date(application.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Current Status</h3>
                  <div>{getStatusBadge(application.status)}</div>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Right side - ML Model, Credit Check, Decision - scrolls independently */}
        <div className="md:col-span-2 space-y-6 h-full overflow-y-auto pr-2">
          {/* Machine Learning Model Decision */}
          <Card>
            <CardHeader className="bg-accent/30 rounded-t-lg">
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" /> 
                Machine Learning Model Decision
              </CardTitle>
              <CardDescription>Automated decision based on machine learning algorithms</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg p-4 border">
                  <div className="text-muted-foreground text-sm mb-2">Approval Status</div>
                  <div className="flex items-center">
                    {application.mlDecision?.status === 'approved' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive mr-2" />
                    )}
                    <span className="font-semibold">
                      {application.mlDecision?.status === 'approved' ? 'Approved' : 'Rejected'}
                    </span>
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border">
                  <div className="text-muted-foreground text-sm mb-2">Interest Rate</div>
                  <div className="flex items-center">
                    <Percent className="h-5 w-5 text-primary mr-2" />
                    <span className="font-semibold">{application.mlDecision?.interestRate}%</span>
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border">
                  <div className="text-muted-foreground text-sm mb-2">Credit Limit</div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <span className="font-semibold">${application.mlDecision?.creditLimit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Check */}
          <Card>
            <CardHeader className="bg-secondary/30 rounded-t-lg">
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" /> 
                Credit Check Results
              </CardTitle>
              <CardDescription>Information from credit bureaus</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg p-4 border">
                  <div className="text-muted-foreground text-sm mb-2">Credit Score</div>
                  <div className="flex items-center">
                    <span className="font-semibold">Score:</span>
                    {getComparativeBadge(application.creditCheck?.creditScore || 0, 680, true)}
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border">
                  <div className="text-muted-foreground text-sm mb-2">Credit Inquiries (Last 6 Months)</div>
                  <div className="flex items-center">
                    <span className="font-semibold">Count:</span>
                    {getComparativeBadge(application.creditCheck?.inquiries || 0, 3, false)}
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border">
                  <div className="text-muted-foreground text-sm mb-2">Credit Utilization</div>
                  <div className="flex items-center">
                    <span className="font-semibold">Rate:</span>
                    {getComparativeBadge(application.creditCheck?.utilization || 0, 30, false)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Decision */}
          <Card>
            <CardHeader className="bg-primary/10 rounded-t-lg">
              <CardTitle className="flex items-center">
                Your Decision
              </CardTitle>
              <CardDescription>Make the final decision on this application</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground mb-4">
                  After reviewing all information, please make your final decision on this application.
                  This action cannot be undone and will notify the applicant.
                </p>
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => setShowRejectDialog(true)}
                    disabled={application.status !== 'pending'}
                  >
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Reject Application
                  </Button>
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => setShowApproveDialog(true)}
                    disabled={application.status !== 'pending'}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Approve Application
                  </Button>
                </div>
                {application.status !== 'pending' && (
                  <div className="text-sm text-muted-foreground mt-4">
                    This application has already been {application.status}.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approve Dialog */}
      <ApprovalDecisionDialog
        open={showApproveDialog} 
        onOpenChange={setShowApproveDialog}
        title="Approve Application"
        description="Are you sure you want to approve this application? This action cannot be undone."
        confirmText="Yes, Approve"
        cancelText="Cancel"
        onConfirm={handleApprovalConfirm}
        icon={<CheckCircle className="h-6 w-6 text-green-500" />}
        confirmButtonClass="bg-green-500 hover:bg-green-600"
      />

      {/* Reject Dialog */}
      <ApprovalDecisionDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        title="Reject Application"
        description="Are you sure you want to reject this application? This action cannot be undone."
        confirmText="Yes, Reject"
        cancelText="Cancel"
        onConfirm={handleRejectionConfirm}
        icon={<XCircle className="h-6 w-6 text-destructive" />}
        confirmButtonClass="bg-destructive hover:bg-destructive/90"
      />
    </div>
  );
};

export default ApplicationDetail;
