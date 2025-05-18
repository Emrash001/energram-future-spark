import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

const AdminPanel = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin, isSuperAdmin, isLoading: authLoading } = useGoogleAuth();
  const [isLoading, setIsLoading] = useState(true);
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
    if (authLoading) return; // Wait for auth to load

    if (!isAdmin) {
      toast({
        title: "Access denied",
        description: "Admins only.",
        variant: "destructive"
      });
      navigate("/");
      return;
    }
    
    fetchData();
  }, [navigate, isAdmin, authLoading]);

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

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-tech-500 border-r-tech-300 border-b-tech-200 border-l-tech-100 rounded-full animate-spin mx-auto"></div>
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <AdminHeader user={user} isAdmin={isAdmin} isSuperAdmin={isSuperAdmin} />
        
        {/* Stats Cards */}
        <AdminStatistics stats={stats} />
        
        {/* Charts Section */}
        <AdminCharts orderAnalytics={orderAnalytics} stats={stats} />
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
            <TabsTrigger value="partnerships">Partnership Inquiries</TabsTrigger>
            {isSuperAdmin && <TabsTrigger value="admins">Manage Admins</TabsTrigger>}
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

          {/* Super Admin Only: Manage Admins Tab */}
          {isSuperAdmin && (
            <TabsContent value="admins">
              <AdminsTab />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;