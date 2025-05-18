
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  secondaryText: string;
  iconBgColor?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  secondaryText, 
  iconBgColor = "bg-primary/10" 
}: StatsCardProps) => {
  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-foreground/70">{title}</h3>
          <p className="text-3xl font-display font-bold">{value}</p>
        </div>
        <div className={`p-2 ${iconBgColor} rounded-md`}>
          {icon}
        </div>
      </div>
      <div className="mt-2 text-xs text-foreground/60">
        {secondaryText}
      </div>
    </div>
  );
};

export default StatsCard;
