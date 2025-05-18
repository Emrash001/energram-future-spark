
export interface Order {
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

export interface Contact {
  id: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  timestamp: any;
}

export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  location: string;
  timestamp: any;
}

export interface Partnership {
  id: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  timestamp: any;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  totalUsers: number;
  waitlistCount: number;
}

export interface User {
  id: string;
  uid?: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: "user" | "admin" | "super_admin";
  createdAt?: any;
}
