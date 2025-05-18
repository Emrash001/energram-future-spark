
import React from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  timestamp: any;
}

interface ContactsTabProps {
  contacts: Contact[];
}

const ContactsTab = ({ contacts }: ContactsTabProps) => {
  return (
    <div className="space-y-6">
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <div key={contact.id} className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.email} • {contact.organization || "N/A"}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {contact.timestamp?.toDate 
                  ? contact.timestamp.toDate().toLocaleDateString() 
                  : new Date().toLocaleDateString()}
              </div>
            </div>
            <p className="text-foreground/90">{contact.message}</p>
          </div>
        ))
      ) : (
        <div className="bg-card border rounded-lg p-6 shadow-sm text-center text-muted-foreground">
          No contact messages found
        </div>
      )}
    </div>
  );
};

export default ContactsTab;
