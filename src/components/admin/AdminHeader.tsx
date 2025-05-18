
import React from 'react';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AdminHeaderProps {
  user: any;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AdminHeader = ({ user, isAdmin, isSuperAdmin }: AdminHeaderProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
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
  );
};

export default AdminHeader;
