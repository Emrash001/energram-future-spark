
import { Order } from "@/types/admin";

export const prepareAnalyticsData = (ordersData: Order[]) => {
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

export const calculateStats = (ordersData: Order[], waitlistData: any[]) => {
  const totalRevenue = ordersData.reduce((sum, order) => sum + (order.amount || 0), 0);
  const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
  const completedOrders = ordersData.filter(order => order.status === 'paid').length;
  
  return {
    totalOrders: ordersData.length,
    totalRevenue,
    pendingOrders,
    completedOrders,
    totalUsers: waitlistData.length + ordersData.length,
    waitlistCount: waitlistData.length
  };
};
