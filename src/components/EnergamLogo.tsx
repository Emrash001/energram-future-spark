
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import logo from "@/assets/energramlogo.png"; // Make sure this file exists

interface EnergamLogoProps {
  className?: string;
  variant?: "default" | "full" | "icon";
}

const EnergamLogo = ({ className, variant = "default" }: EnergamLogoProps) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  
  if (variant === "icon") {
    return (
      <div className={cn("relative w-16 h-16", className)}>
        <div className={cn(
          "w-full h-full rounded-full overflow-hidden flex items-center justify-center",
          isDarkMode ? "bg-white p-1.5 shadow-lg" : ""
        )}>
          <img
            src={logo}
            alt="Energram Icon Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div className={cn(
          "w-16 h-16 rounded-full overflow-hidden flex items-center justify-center", 
          isDarkMode ? "bg-white p-1.5 shadow-md" : ""
        )}>
          <img
            src={logo}
            alt="Energram Full Logo"
            className="w-full h-full object-contain"
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
