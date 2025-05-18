
import React from 'react';

interface Partnership {
  id: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  timestamp: any;
}

interface PartnershipsTabProps {
  partnerships: Partnership[];
}

const PartnershipsTab = ({ partnerships }: PartnershipsTabProps) => {
  return (
    <div className="space-y-6">
      {partnerships.length > 0 ? (
        partnerships.map((partnership) => (
          <div key={partnership.id} className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-medium">{partnership.name}</h3>
                <p className="text-sm text-muted-foreground">{partnership.email} • {partnership.organization || "N/A"}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {partnership.timestamp?.toDate 
                  ? partnership.timestamp.toDate().toLocaleDateString() 
                  : new Date().toLocaleDateString()}
              </div>
            </div>
            <p className="text-foreground/90">{partnership.message}</p>
          </div>
        ))
      ) : (
        <div className="bg-card border rounded-lg p-6 shadow-sm text-center text-muted-foreground">
          No partnership inquiries found
        </div>
      )}
    </div>
  );
};

export default PartnershipsTab;
