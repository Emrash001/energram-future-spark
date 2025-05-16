
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all mb-6"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
