
import React from 'react';
import StatsCard from './StatsCard';

interface AdminStatisticsProps {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    completedOrders: number;
    totalUsers: number;
    waitlistCount: number;
  };
}

const AdminStatistics = ({ stats }: AdminStatisticsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard 
        title="Total Orders" 
        value={stats.totalOrders} 
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4"></path>
            <line x1="3" x2="21" y1="6" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        } 
        secondaryText={`${stats.pendingOrders} pending orders`} 
      />
      
      <StatsCard 
        title="Total Revenue" 
        value={`₦${stats.totalRevenue.toLocaleString()}`}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        } 
        iconBgColor="bg-green-500/10"
        secondaryText={`Average: ₦${stats.totalOrders ? Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString() : 0} per order`} 
      />
      
      <StatsCard 
        title="Total Users" 
        value={stats.totalUsers}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        } 
        iconBgColor="bg-blue-500/10"
        secondaryText={`${stats.waitlistCount} on waitlist`} 
      />
      
      <StatsCard 
        title="Completion Rate" 
        value={`${stats.totalOrders ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0}%`}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-solar-500">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        } 
        iconBgColor="bg-solar-500/10"
        secondaryText={`${stats.completedOrders} completed orders`} 
      />
    </div>
  );
};

export default AdminStatistics;
