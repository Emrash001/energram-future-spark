
import { cn } from "@/lib/utils";

interface EnergamLogoProps {
  className?: string;
  variant?: "default" | "full" | "icon";
}

const EnergamLogo = ({ className, variant = "default" }: EnergamLogoProps) => {
  if (variant === "icon") {
    return (
      <div className={cn("relative w-8 h-8", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-tech-500 to-solar-500 rounded-lg opacity-70 blur-sm"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M12 2v10m0 8v-4" />
            <circle cx="12" cy="12" r="10" />
            <path d="m4.93 4.93 4.24 4.24" />
            <path d="m14.83 9.17 4.24-4.24" />
            <path d="M8.83 8.83 5.17 5.17" />
            <path d="M18.83 5.17 15.17 8.83" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-gradient-to-br from-tech-500 to-solar-500 rounded-lg opacity-70 blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2v10m0 8v-4" />
              <circle cx="12" cy="12" r="10" />
              <path d="m4.93 4.93 4.24 4.24" />
              <path d="m14.83 9.17 4.24-4.24" />
            </svg>
          </div>
        </div>
        <span className="font-display font-bold text-2xl md:text-3xl bg-gradient-to-r from-tech-700 to-solar-500 bg-clip-text text-transparent">
          Energram
        </span>
      </div>
    );
  }

  // Default logo variant
  return (
    <span className={cn("font-display font-bold text-xl md:text-2xl bg-gradient-to-r from-tech-700 to-solar-500 bg-clip-text text-transparent", className)}>
      Energram
    </span>
  );
};

export default EnergamLogo;
