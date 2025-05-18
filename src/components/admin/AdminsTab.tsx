
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, UserMinus, AlertCircle } from "lucide-react";
import { User } from "@/types/admin";

const AdminsTab = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setLoadError(null);
      
      const usersQuery = query(collection(db, "users"), orderBy("email"));
      const usersSnapshot = await getDocs(usersQuery);
      
      if (usersSnapshot.empty) {
        console.log("No users found in the collection");
      } else {
        console.log(`Found ${usersSnapshot.docs.length} users`);
      }
      
      const usersData = usersSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as User[];
      
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoadError("Failed to load users. Please try again.");
      toast({
        title: "Error",
        description: "Could not load users",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromoteToAdmin = async (userId: string, email: string) => {
    try {
      setActionInProgress(userId);
      await updateDoc(doc(db, "users", userId), { role: "admin" });
      toast({
        title: "Success",
        description: `${email} is now an admin`,
      });
      
      // Update local state to reflect changes
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: "admin" } : user
      ));
    } catch (error) {
      console.error("Error promoting user:", error);
      toast({
        title: "Error",
        description: "Could not promote user",
        variant: "destructive"
      });
    } finally {
      setActionInProgress(null);
    }
  };

  const handleRemoveAdmin = async (userId: string, email: string) => {
    try {
      setActionInProgress(userId);
      await updateDoc(doc(db, "users", userId), { role: "user" });
      toast({
        title: "Success",
        description: `${email} is no longer an admin`,
      });
      
      // Update local state to reflect changes
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: "user" } : user
      ));
    } catch (error) {
      console.error("Error removing admin status:", error);
      toast({
        title: "Error",
        description: "Could not remove admin status",
        variant: "destructive"
      });
    } finally {
      setActionInProgress(null);
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const retryFetchUsers = () => {
    fetchUsers();
  };

  if (isLoading) {
    return (
      <div className="bg-card border rounded-lg p-6 shadow-sm flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4 py-10">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h3 className="font-medium text-lg text-center">{loadError}</h3>
          <Button onClick={retryFetchUsers} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm">
      <h3 className="font-medium text-lg mb-4">Admin Management</h3>
      <p className="text-muted-foreground mb-6">
        As Super Admin, you can manage who has admin access to the dashboard. Regular admins can view data but cannot manage other admins.
      </p>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Manage User Roles</h4>
          <div className="space-y-3">
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user.id} className="p-4 border rounded-md bg-background/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-10 w-10 ${user.role === 'super_admin' ? 'border-2 border-solar-500' : ''}`}>
                      {user.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user.email} />
                      ) : (
                        <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <div className="flex items-center mt-1">
                        {user.role === 'super_admin' && (
                          <span className="text-xs text-muted-foreground">You (Super Admin)</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={
                        user.role === 'super_admin' 
                          ? 'bg-solar-500 hover:bg-solar-600' 
                          : user.role === 'admin' 
                          ? 'bg-primary' 
                          : 'bg-muted text-muted-foreground'
                      }
                    >
                      {user.role === 'super_admin' ? 'Super Admin' : user.role === 'admin' ? 'Admin' : 'User'}
                    </Badge>
                    
                    {/* Only show action buttons for non-super admin users */}
                    {user.role !== 'super_admin' && (
                      <div className="ml-2">
                        {user.role === 'user' ? (
                          <Button 
                            onClick={() => handlePromoteToAdmin(user.id, user.email)}
                            size="sm" 
                            variant="outline"
                            disabled={actionInProgress === user.id}
                          >
                            {actionInProgress === user.id ? (
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            ) : (
                              <UserPlus className="h-3 w-3 mr-1" />
                            )}
                            Make Admin
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleRemoveAdmin(user.id, user.email)}
                            size="sm" 
                            variant="outline"
                            disabled={actionInProgress === user.id}
                          >
                            {actionInProgress === user.id ? (
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            ) : (
                              <UserMinus className="h-3 w-3 mr-1" />
                            )}
                            Remove Admin
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground bg-background/50 border rounded-md">
                No users found. This might be a database connection issue.
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Note:</strong> Only users with the Super Admin role can manage admin access rights.
        </p>
      </div>
    </div>
  );
};

export default AdminsTab;
