
import React from 'react';
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  location: string;
  timestamp: any;
}

interface WaitlistTabProps {
  waitlist: WaitlistEntry[];
}

const WaitlistTab = ({ waitlist }: WaitlistTabProps) => {
  return (
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
  );
};

export default WaitlistTab;
