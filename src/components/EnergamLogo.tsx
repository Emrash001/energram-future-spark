import { cn } from "@/lib/utils";
import logo from "@/assets/energramlogo.png"; // Make sure this file exists

interface EnergamLogoProps {
  className?: string;
  variant?: "default" | "full" | "icon";
}

const EnergamLogo = ({ className, variant = "default" }: EnergamLogoProps) => {
  if (variant === "icon") {
  return (
    <div className={cn("relative w-16 h-16", className)}>
      <img
        src={logo}
        alt="Energram Icon Logo"
        className="w-full h-full object-contain rounded-md"
      />
    </div>
  );
}

if (variant === "full") {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-20 h-20">
        <img
          src={logo}
          alt="Energram Full Logo"
          className="w-full h-full object-contain rounded-md"
        />
      </div>
      <span className="font-display font-bold text-2xl md:text-3xl bg-gradient-to-r from-tech-700 to-solar-500 bg-clip-text text-transparent">
        Energram
      </span>
    </div>
  );
}


  // Default logo variant (text only)
  return (
    <span
      className={cn(
        "font-display font-bold text-xl md:text-2xl bg-gradient-to-r from-tech-700 to-solar-500 bg-clip-text text-transparent",
        className
      )}
    >
      Energram
    </span>
  );
};

export default EnergamLogo;
