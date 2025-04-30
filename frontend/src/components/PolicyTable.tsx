import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash } from "lucide-react";
import { IPolicy } from "@/utils/policy";
import PolicyDialog from "./PolicyDialog";

interface PolicyTableProps {
  policies: IPolicy[];
  isLoading: boolean;
  formData: Partial<IPolicy>;
  fieldNames: string[];
  onEditClick: (policy: IPolicy) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: () => void;
  onDelete: (id: number) => void;
  onCancelEdit: () => void;
  editingId: number | null;
}

const PolicyTable = ({
  policies,
  isLoading,
  formData,
  fieldNames,
  onEditClick,
  onChange,
  onUpdate,
  onDelete,
  onCancelEdit,
}: PolicyTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#242322] rounded-t-md text-[#fafafa]">
          <TableHead className="text-center w-1/7 rounded-tl-md">
            No Polis
          </TableHead>
          <TableHead className="text-center w-1/7">Nama Tertanggung</TableHead>
          <TableHead className="text-center w-1/7">Periode</TableHead>
          <TableHead className="text-center w-1/7">Nama Item</TableHead>
          <TableHead className="text-center w-1/7">
            Harga Pertanggungan
          </TableHead>
          <TableHead className="text-center w-1/7">Harga Premi</TableHead>
          <TableHead className="text-center w-1/7 rounded-tr-md">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : policies.length > 0 ? (
          policies.map((policy) => (
            <TableRow key={policy.id}>
              <TableCell className="text-center">
                {policy.policy_number}
              </TableCell>
              <TableCell className="text-center">
                {policy.insured_name}
              </TableCell>
              <TableCell className="text-center">
                {new Date(policy.effective_date).toLocaleDateString()} -{" "}
                {new Date(policy.expiry_date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                {policy.vehicle_brand} {policy.vehicle_type}
              </TableCell>
              <TableCell className="text-center">
                {parseFloat(policy.vehicle_price).toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-center">
                {parseFloat(policy.premium_price).toLocaleString("id-ID")}
              </TableCell>
              <TableCell>
                <div className="gap-x-1 flex justify-center items-center">
                  <PolicyDialog
                    mode="edit"
                    trigger={
                      <div
                        className="bg-[#53BF9D] text-white rounded-md p-1 cursor-pointer"
                        onClick={() => onEditClick(policy)}
                      >
                        <Pencil className="w-5 h-5" />
                      </div>
                    }
                    fieldNames={fieldNames}
                    formData={formData}
                    isLoading={isLoading}
                    onChange={onChange}
                    onSubmit={onUpdate}
                    onCancel={onCancelEdit}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="bg-[#F94C66] text-white rounded-md p-1 cursor-pointer">
                        <Trash className="w-5 h-5" />
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the policy.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-[#F94C66] hover:bg-[#F94C66]/80 text-white"
                          onClick={() => onDelete(policy.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PolicyTable;
