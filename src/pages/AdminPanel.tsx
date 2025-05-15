
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

const AdminPanel = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  });

  useEffect(() => {
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
      
      // Calculate stats
      const totalRevenue = ordersData.reduce((sum, order) => sum + (order.amount || 0), 0);
      const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
      const completedOrders = ordersData.filter(order => order.status === 'paid').length;
      
      setStats({
        totalOrders: ordersData.length,
        totalRevenue,
        pendingOrders,
        completedOrders
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

  if (!isAuthenticated) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold">
            Energram Admin Dashboard
          </h1>
          <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-foreground/70">Total Orders</h3>
            <p className="text-3xl font-display font-bold">{stats.totalOrders}</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-foreground/70">Total Revenue</h3>
            <p className="text-3xl font-display font-bold">₦{stats.totalRevenue.toLocaleString()}</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-foreground/70">Pending Orders</h3>
            <p className="text-3xl font-display font-bold">{stats.pendingOrders}</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-foreground/70">Completed Orders</h3>
            <p className="text-3xl font-display font-bold">{stats.completedOrders}</p>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
          </TabsList>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{order.name}</div>
                            <div className="text-sm text-foreground/70">{order.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.plan === 'purchase' ? 'One-time Purchase' : 'PaaS'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ₦{order.amount?.toLocaleString() || '0'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'paid' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500'
                            }`}>
                              {order.status === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {order.timestamp?.toDate 
                              ? order.timestamp.toDate().toLocaleDateString() 
                              : new Date().toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-foreground/70">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Waitlist Tab */}
          <TabsContent value="waitlist">
            <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {waitlist.length > 0 ? (
                      waitlist.map((entry) => (
                        <tr key={entry.id}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            {entry.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {entry.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {entry.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {entry.timestamp?.toDate 
                              ? entry.timestamp.toDate().toLocaleDateString() 
                              : new Date().toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-foreground/70">
                          No waitlist entries found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
                        <p className="text-sm text-foreground/70">{contact.email} • {contact.organization}</p>
                      </div>
                      <div className="text-sm text-foreground/70">
                        {contact.timestamp?.toDate 
                          ? contact.timestamp.toDate().toLocaleDateString() 
                          : new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-foreground/90">{contact.message}</p>
                  </div>
                ))
              ) : (
                <div className="bg-card border rounded-lg p-6 shadow-sm text-center text-foreground/70">
                  No contact messages found
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
