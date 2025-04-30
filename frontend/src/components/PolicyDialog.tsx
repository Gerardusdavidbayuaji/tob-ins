import { fieldLabels, dateFields } from "@/utils/constant";
import { Input } from "@/components/ui/input";
import { IPolicy } from "@/utils/policy";
import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
} from "@/components/ui/alert-dialog";

import DatePicker from "@/components/DatePicker";

interface PolicyDialogProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (field: keyof IPolicy, date: Date | undefined) => void;
  formData: Partial<IPolicy>;
  trigger: React.ReactNode;
  mode: "create" | "edit";
  onCancel?: () => void;
  onSubmit: () => void;
  fieldNames: string[];
  isLoading: boolean;
}

const PolicyDialog = (props: PolicyDialogProps) => {
  const {
    onDateChange,
    fieldNames,
    isLoading,
    formData,
    onSubmit,
    onChange,
    onCancel,
    trigger,
    mode,
  } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {fieldNames.map((field) => (
              <div key={field}>
                {dateFields.includes(field) ? (
                  <DatePicker
                    label={fieldLabels[field]}
                    value={formData[field as keyof IPolicy] as string}
                    onChange={(date) =>
                      onDateChange(field as keyof IPolicy, date)
                    }
                  />
                ) : (
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 ml-1">
                      {fieldLabels[field]}
                    </label>
                    <Input
                      name={field}
                      placeholder={fieldLabels[field]}
                      value={formData[field as keyof typeof formData] || ""}
                      onChange={onChange}
                      className="text-gray-700"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>
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
