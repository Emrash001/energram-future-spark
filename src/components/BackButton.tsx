
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
