import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Sliders, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  userType: string;
  plan: string;
  amount: number;
  status: string;
  timestamp: any;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  timestamp: any;
}

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  location: string;
  timestamp: any;
}

interface Partnership {
  id: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  timestamp: any;
}

const AdminPanel = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin, isSuperAdmin } = useGoogleAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orderAnalytics, setOrderAnalytics] = useState<any[]>([]);

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalUsers: 0,
    waitlistCount: 0
  });

  // For chart data
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!isAdmin) {
        toast({
          title: "Access denied",
          description: "Admins only.",
          variant: "destructive"
        });
        navigate("/");
        return;
      }
      
      if (currentUser) {
        fetchData();
      } else {
        navigate("/admin-login");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, isAdmin]);

  const prepareAnalyticsData = (ordersData: Order[]) => {
    // Group orders by month
    const monthlyData = ordersData.reduce((acc: any, order) => {
      const date = order.timestamp?.toDate ? order.timestamp.toDate() : new Date();
      const month = date.toLocaleString('default', { month: 'short' });
      
      if (!acc[month]) {
        acc[month] = {
          name: month,
          orders: 0,
          revenue: 0
        };
      }
      
      acc[month].orders += 1;
      acc[month].revenue += order.amount || 0;
      
      return acc;
    }, {});
    
    // Convert to array for chart
    return Object.values(monthlyData);
  };

  const fetchData = async () => {
    try {
      // Fetch orders
      const ordersQuery = query(collection(db, "orders"), orderBy("timestamp", "desc"));
      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersData = ordersSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Order[];
      setOrders(ordersData);
      
      // Prepare analytics data
      setOrderAnalytics(prepareAnalyticsData(ordersData));
      
      // Fetch contacts
      const contactsQuery = query(collection(db, "contacts"), orderBy("timestamp", "desc"));
      const contactsSnapshot = await getDocs(contactsQuery);
      const contactsData = contactsSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Contact[];
      setContacts(contactsData);
      
      // Fetch waitlist
      const waitlistQuery = query(collection(db, "waitlist"), orderBy("timestamp", "desc"));
      const waitlistSnapshot = await getDocs(waitlistQuery);
      const waitlistData = waitlistSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as WaitlistEntry[];
      setWaitlist(waitlistData);
      
      // Fetch partnerships (if collection exists)
      try {
        const partnershipsQuery = query(collection(db, "partnerships"), orderBy("timestamp", "desc"));
        const partnershipsSnapshot = await getDocs(partnershipsQuery);
        const partnershipsData = partnershipsSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as Partnership[];
        setPartnerships(partnershipsData);
      } catch (error) {
        console.log("Partnerships collection may not exist yet");
      }
      
      // Calculate stats
      const totalRevenue = ordersData.reduce((sum, order) => sum + (order.amount || 0), 0);
      const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
      const completedOrders = ordersData.filter(order => order.status === 'paid').length;
      
      setStats({
        totalOrders: ordersData.length,
        totalRevenue,
        pendingOrders,
        completedOrders,
        totalUsers: waitlistData.length + ordersData.length,
        waitlistCount: waitlistData.length
      });
      
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-tech-500 border-r-tech-300 border-b-tech-200 border-l-tech-100 rounded-full animate-spin mx-auto"></div>
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Data for pie chart - order distribution
  const distributionData = [
    { name: 'Paid', value: stats.completedOrders },
    { name: 'Pending', value: stats.pendingOrders },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">
              Energram Admin Dashboard
            </h1>
            <div className="flex items-center mt-1">
              <Badge variant={isSuperAdmin ? "default" : "outline"} className={isSuperAdmin ? "bg-solar-500 hover:bg-solar-600" : ""}>
                {isSuperAdmin ? "Super Admin" : "Admin"}
              </Badge>
              <span className="text-sm ml-2 text-muted-foreground">{user?.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.photoURL || ''} />
              <AvatarFallback>{user?.email?.substring(0, 2).toUpperCase() || 'AD'}</AvatarFallback>
            </Avatar>
            <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-foreground/70">Total Orders</h3>
                <p className="text-3xl font-display font-bold">{stats.totalOrders}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4"></path>
                  <line x1="3" x2="21" y1="6" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-foreground/60">
              {stats.pendingOrders} pending orders
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-foreground/70">Total Revenue</h3>
                <p className="text-3xl font-display font-bold">₦{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-foreground/60">
              Average: ₦{stats.totalOrders ? Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString() : 0} per order
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-foreground/70">Total Users</h3>
                <p className="text-3xl font-display font-bold">{stats.totalUsers}</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-foreground/60">
              {stats.waitlistCount} on waitlist
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-foreground/70">Completion Rate</h3>
                <p className="text-3xl font-display font-bold">{stats.totalOrders ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0}%</p>
              </div>
              <div className="p-2 bg-solar-500/10 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-solar-500">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
            </div>
            <div className="mt-2 text-xs text-foreground/60">
              {stats.completedOrders} completed orders
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue over time */}
          <div className="lg:col-span-2 bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Orders & Revenue</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={orderAnalytics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip />
                  <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (₦)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Order status distribution */}
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
            <TabsTrigger value="partnerships">Partnership Inquiries</TabsTrigger>
            {isSuperAdmin && <TabsTrigger value="admins">Manage Admins</TabsTrigger>}
          </TabsList>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
                <div className="relative max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8 max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                          <DrawerTitle>Filter Orders</DrawerTitle>
                          <DrawerDescription>Filter orders by status or other criteria</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Status</h4>
                            <div className="grid grid-cols-3 gap-2">
                              <Button 
                                variant={statusFilter === "all" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setStatusFilter("all")}
                              >
                                All
                              </Button>
                              <Button 
                                variant={statusFilter === "paid" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setStatusFilter("paid")}
                                className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 border-green-200"
                              >
                                Paid
                              </Button>
                              <Button 
                                variant={statusFilter === "pending" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setStatusFilter("pending")}
                                className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900 border-yellow-200"
                              >
                                Pending
                              </Button>
                            </div>
                          </div>
                        </div>
                        <DrawerFooter>
                          <Button onClick={() => setStatusFilter("all")}>Reset Filters</Button>
                          <DrawerClose>
                            <Button variant="outline" className="w-full">Close</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                  
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <div className="font-medium">{order.name}</div>
                            <div className="text-sm text-muted-foreground">{order.email}</div>
                          </TableCell>
                          <TableCell>
                            {order.plan === 'purchase' ? 'One-time Purchase' : 'PaaS'}
                          </TableCell>
                          <TableCell>
                            ₦{order.amount?.toLocaleString() || '0'}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'paid' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500'
                            }`}>
                              {order.status === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {order.timestamp?.toDate 
                              ? order.timestamp.toDate().toLocaleDateString() 
                              : new Date().toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No orders found matching your filters
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          {/* Waitlist Tab */}
          <TabsContent value="waitlist">
            <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-medium">Waitlist Entries: {waitlist.length}</h3>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waitlist.length > 0 ? (
                      waitlist.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">
                            {entry.name}
                          </TableCell>
                          <TableCell>
                            {entry.email}
                          </TableCell>
                          <TableCell>
                            {entry.location || "N/A"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {entry.timestamp?.toDate 
                              ? entry.timestamp.toDate().toLocaleDateString() 
                              : new Date().toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No waitlist entries found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          {/* Contact Messages Tab */}
          <TabsContent value="contacts">
            <div className="space-y-6">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div key={contact.id} className="bg-card border rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.email} • {contact.organization || "N/A"}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {contact.timestamp?.toDate 
                          ? contact.timestamp.toDate().toLocaleDateString() 
                          : new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-foreground/90">{contact.message}</p>
                  </div>
                ))
              ) : (
                <div className="bg-card border rounded-lg p-6 shadow-sm text-center text-muted-foreground">
                  No contact messages found
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Partnership Inquiries Tab */}
          <TabsContent value="partnerships">
            <div className="space-y-6">
              {partnerships.length > 0 ? (
                partnerships.map((partnership) => (
                  <div key={partnership.id} className="bg-card border rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="font-medium">{partnership.name}</h3>
                        <p className="text-sm text-muted-foreground">{partnership.email} • {partnership.organization || "N/A"}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {partnership.timestamp?.toDate 
                          ? partnership.timestamp.toDate().toLocaleDateString() 
                          : new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-foreground/90">{partnership.message}</p>
                  </div>
                ))
              ) : (
                <div className="bg-card border rounded-lg p-6 shadow-sm text-center text-muted-foreground">
                  No partnership inquiries found
                </div>
              )}
            </div>
          </TabsContent>

          {/* Super Admin Only: Manage Admins Tab */}
          {isSuperAdmin && (
            <TabsContent value="admins">
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h3 className="font-medium text-lg mb-4">Admin Management</h3>
                <p className="text-muted-foreground mb-6">
                  As Super Admin, you can manage access to the admin dashboard. Regular admins can view data but cannot manage other admins.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Super Admin</h4>
                    <div className="p-4 border rounded-md bg-background/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-solar-500">
                          <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">yekinirasheed2002@gmail.com</p>
                          <p className="text-sm text-muted-foreground">Full access and control</p>
                        </div>
                      </div>
                      <Badge className="bg-solar-500 hover:bg-solar-600">Super Admin</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Standard Admins</h4>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-md bg-background/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>DA</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">durosarovic@gmail.com</p>
                            <p className="text-sm text-muted-foreground">Limited admin access</p>
                          </div>
                        </div>
                        <Badge variant="outline">Admin</Badge>
                      </div>
                      
                      <div className="p-4 border rounded-md bg-background/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>LI</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">lauretteibekwe@gmail.com</p>
                            <p className="text-sm text-muted-foreground">Limited admin access</p>
                          </div>
                        </div>
                        <Badge variant="outline">Admin</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Note:</strong> Admin roles are hardcoded for security. Contact the Super Admin to modify access rights.
                  </p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
