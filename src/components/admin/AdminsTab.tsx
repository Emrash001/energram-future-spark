
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AdminsTab = () => {
  return (
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
  );
};

export default AdminsTab;
