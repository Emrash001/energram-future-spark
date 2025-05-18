
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
<<<<<<< Updated upstream
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { prepareAnalyticsData, calculateStats } from "@/utils/admin";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatistics from "@/components/admin/AdminStatistics";
import AdminCharts from "@/components/admin/AdminCharts";
import OrdersTab from "@/components/admin/OrdersTab";
import WaitlistTab from "@/components/admin/WaitlistTab";
import ContactsTab from "@/components/admin/ContactsTab";
import PartnershipsTab from "@/components/admin/PartnershipsTab";
import AdminsTab from "@/components/admin/AdminsTab";
import { Order, Contact, WaitlistEntry, Partnership, AdminStats } from "@/types/admin";
=======
import { Search, Sliders, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
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
>>>>>>> Stashed changes

const AdminPanel = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [orderAnalytics, setOrderAnalytics] = useState<any[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalUsers: 0,
    waitlistCount: 0
  });

  useEffect(() => {
<<<<<<< Updated upstream
    if (!isAdmin) {
      toast({
        title: "Access denied",
        description: "Admins only.",
        variant: "destructive"
      });
      navigate("/");
      return;
    }
=======
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "yekinirasheed2002@gmail.com") {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setIsAuthenticated(false);
        navigate("/admin-login");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

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
>>>>>>> Stashed changes
    
    fetchData();
  }, [navigate, isAdmin]);

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
      setStats(calculateStats(ordersData, waitlistData));
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
      setIsLoading(false);
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

<<<<<<< Updated upstream
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <AdminHeader user={user} isAdmin={isAdmin} isSuperAdmin={isSuperAdmin} />
=======
  if (!isAuthenticated) {
    return null; // Redirect handled by useEffect
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
          <h1 className="text-3xl font-display font-bold">
            Energram Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
          </div>
        </div>
>>>>>>> Stashed changes
        
        {/* Stats Cards */}
        <AdminStatistics stats={stats} />
        
        {/* Charts Section */}
<<<<<<< Updated upstream
        <AdminCharts orderAnalytics={orderAnalytics} stats={stats} />
=======
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
                  <Tooltip />
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
>>>>>>> Stashed changes
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
            <TabsTrigger value="partnerships">Partnership Inquiries</TabsTrigger>
          </TabsList>
          
          {/* Tab Content */}
          <TabsContent value="orders">
            <OrdersTab orders={orders} />
          </TabsContent>
          
          <TabsContent value="waitlist">
            <WaitlistTab waitlist={waitlist} />
          </TabsContent>
          
          <TabsContent value="contacts">
            <ContactsTab contacts={contacts} />
          </TabsContent>
          
          <TabsContent value="partnerships">
            <PartnershipsTab partnerships={partnerships} />
          </TabsContent>
<<<<<<< Updated upstream

          {/* Super Admin Only: Manage Admins Tab */}
          {isSuperAdmin && (
            <TabsContent value="admins">
              <AdminsTab />
            </TabsContent>
          )}
=======
>>>>>>> Stashed changes
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
