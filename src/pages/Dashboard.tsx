
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, DownloadCloud, Filter, UserPlus, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for line of credit applications
const mockApplications = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    amount: 15000,
    status: 'approved',
    date: '2023-08-12',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    amount: 25000,
    status: 'pending',
    date: '2023-08-15',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    amount: 50000,
    status: 'rejected',
    date: '2023-08-10',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    amount: 30000,
    status: 'approved',
    date: '2023-08-08',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    amount: 10000,
    status: 'pending',
    date: '2023-08-16',
  },
];

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
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
                          <Button variant="ghost" size="sm">View</Button>
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
                            <Button variant="ghost" size="sm">View</Button>
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
                            <Button variant="ghost" size="sm">View</Button>
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
                            <Button variant="ghost" size="sm">View</Button>
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
    </div>
  );
};

export default Dashboard;
