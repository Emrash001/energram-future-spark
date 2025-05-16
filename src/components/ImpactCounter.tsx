
import { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const Counter = ({ value, label, prefix = "", suffix = "", duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    startTimeRef.current = null;
    countRef.current = 0;
    setCount(0);
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const runtime = timestamp - startTimeRef.current;
      const relativeProgress = runtime / duration;
      
      if (runtime < duration) {
        countRef.current = Math.min(Math.floor(relativeProgress * value), value);
        setCount(countRef.current);
        requestAnimationFrame(animate);
      } else {
        countRef.current = value;
        setCount(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-4xl font-display font-bold text-gradient">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="mt-2 text-foreground/70 text-center">{label}</p>
    </div>
  );
};

const ImpactCounter = () => {
  const [stats, setStats] = useState({
    devices: 2500,
    co2: 25000000,
    users: 15000,
    hours: 85
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Try to fetch stats from Firestore
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stats"));
        if (!querySnapshot.empty) {
          // Use the first document as the stats
          const data = querySnapshot.docs[0].data();
          setStats({
            devices: data.devices || stats.devices,
            co2: data.co2 || stats.co2,
            users: data.users || stats.users,
            hours: data.hours || stats.hours
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Keep using the default stats
      }
    };
    
    fetchStats();
    
    // Set up intersection observer for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={sectionRef} 
      className={`bg-card border rounded-xl p-8 shadow-sm transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="text-2xl font-display font-bold mb-4 text-center">
        Our 12-Month Impact Goals
      </h2>
      <p className="text-center mb-8 text-foreground/70 max-w-2xl mx-auto">
        Projected based on pilot testing & product modeling
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
        <Counter 
          value={stats.devices} 
          label="Homes and businesses targeted across Nigeria" 
          prefix="+" 
          duration={2000}
        />
        
        <Counter 
          value={7} 
          label="Hours/day of clean, consistent solar power" 
          suffix="+" 
          duration={2500}
        />
        
        <Counter 
          value={stats.co2} 
          label="In fuel costs saved for families and businesses" 
          prefix="₦" 
          duration={3000}
        />
        
        <Counter 
          value={12} 
          label="Priority states connected" 
          duration={2500}
        />
        
        <Counter 
          value={15000} 
          label="Smart devices expected online" 
          suffix="+" 
          duration={3000}
        />
        
        <Counter 
          value={85} 
          label="Reduction in blackouts for our users" 
          suffix="%" 
          duration={3500}
        />
      </div>
    </div>
  );
};

export default ImpactCounter;
