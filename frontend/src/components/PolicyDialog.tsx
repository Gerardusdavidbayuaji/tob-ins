import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { IPolicy } from "@/utils/policy";

interface PolicyDialogProps {
  mode: "create" | "edit";
  trigger: React.ReactNode;
  fieldNames: string[];
  formData: Partial<IPolicy>;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel?: () => void;
}

const PolicyDialog = ({
  mode,
  trigger,
  fieldNames,
  formData,
  isLoading,
  onChange,
  onSubmit,
  onCancel,
}: PolicyDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {fieldNames.map((field) => (
              <Input
                key={field}
                name={field}
                placeholder={field.replace("_", " ")}
                value={formData[field as keyof typeof formData] || ""}
                onChange={onChange}
              />
            ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={isLoading}>
            {isLoading
              ? mode === "create"
                ? "Processing..."
                : "Updating..."
              : mode === "create"
              ? "Create"
              : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PolicyDialog;
