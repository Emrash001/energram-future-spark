
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  textarea?: boolean;
  error?: string;
}

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  className,
  textarea = false,
  error
}: FormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[120px]"
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
      
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default FormField;
