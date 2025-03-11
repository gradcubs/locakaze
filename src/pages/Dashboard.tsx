
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, DownloadCloud, Filter, UserPlus, RefreshCw, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';

// Mock data for line of credit applications
const mockApplications = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    amount: 15000,
    status: 'approved',
    date: '2023-08-12',
    address: '123 Main St, New York, NY 10001',
    phone: '(555) 123-4567',
    creditScore: 750,
    annualIncome: 85000,
    employment: 'Full Time',
    reason: 'Home renovation'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    amount: 25000,
    status: 'pending',
    date: '2023-08-15',
    address: '456 Park Ave, Boston, MA 02108',
    phone: '(555) 234-5678',
    creditScore: 720,
    annualIncome: 75000,
    employment: 'Full Time',
    reason: 'Debt consolidation'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    amount: 50000,
    status: 'rejected',
    date: '2023-08-10',
    address: '789 Oak St, Chicago, IL 60007',
    phone: '(555) 345-6789',
    creditScore: 620,
    annualIncome: 65000,
    employment: 'Part Time',
    reason: 'Business expansion'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    amount: 30000,
    status: 'approved',
    date: '2023-08-08',
    address: '321 Pine St, San Francisco, CA 94101',
    phone: '(555) 456-7890',
    creditScore: 780,
    annualIncome: 95000,
    employment: 'Full Time',
    reason: 'Education expenses'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    amount: 10000,
    status: 'pending',
    date: '2023-08-16',
    address: '654 Maple Ave, Seattle, WA 98101',
    phone: '(555) 567-8901',
    creditScore: 700,
    annualIncome: 70000,
    employment: 'Contract',
    reason: 'Vehicle purchase'
  },
];

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockApplications[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleViewUser = (user: typeof mockApplications[0]) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const filteredApplications = mockApplications.filter((app) => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="flex-1 space-y-4 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="default" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockApplications.filter(app => app.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockApplications.filter(app => app.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockApplications.filter(app => app.status === 'rejected').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Same as last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <DownloadCloud className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((application) => (
                      <tr key={application.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">{application.name}</td>
                        <td className="p-4">{application.email}</td>
                        <td className="p-4">${application.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(application.status)} variant="outline">
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4">{new Date(application.date).toLocaleDateString()}</td>
                        <td className="p-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewUser(application)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications
                      .filter((app) => app.status === 'approved')
                      .map((application) => (
                        <tr key={application.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">{application.name}</td>
                          <td className="p-4">{application.email}</td>
                          <td className="p-4">${application.amount.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" variant="outline">
                              Approved
                            </Badge>
                          </td>
                          <td className="p-4">{new Date(application.date).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewUser(application)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications
                      .filter((app) => app.status === 'pending')
                      .map((application) => (
                        <tr key={application.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">{application.name}</td>
                          <td className="p-4">{application.email}</td>
                          <td className="p-4">${application.amount.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" variant="outline">
                              Pending
                            </Badge>
                          </td>
                          <td className="p-4">{new Date(application.date).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewUser(application)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications
                      .filter((app) => app.status === 'rejected')
                      .map((application) => (
                        <tr key={application.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">{application.name}</td>
                          <td className="p-4">{application.email}</td>
                          <td className="p-4">${application.amount.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" variant="outline">
                              Rejected
                            </Badge>
                          </td>
                          <td className="p-4">{new Date(application.date).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewUser(application)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> 
              Applicant Details
            </DialogTitle>
            <DialogDescription>
              Complete details for the selected applicant.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Name</h4>
                  <p className="text-base">{selectedUser.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <Badge className={`mt-1 ${getStatusColor(selectedUser.status)}`} variant="outline">
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                <p className="text-base">{selectedUser.email}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                <p className="text-base">{selectedUser.phone}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                <p className="text-base">{selectedUser.address}</p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="mb-2 font-medium">Financial Information</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Amount Requested</h4>
                    <p className="text-base">${selectedUser.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Credit Score</h4>
                    <p className="text-base">{selectedUser.creditScore}</p>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Annual Income</h4>
                    <p className="text-base">${selectedUser.annualIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Employment</h4>
                    <p className="text-base">{selectedUser.employment}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Reason</h4>
                  <p className="text-base">{selectedUser.reason}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="mb-2 font-medium">Application Information</h4>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date Applied</h4>
                  <p className="text-base">{new Date(selectedUser.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
