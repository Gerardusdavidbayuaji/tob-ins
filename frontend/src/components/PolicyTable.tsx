import { IPolicy } from "@/utils/policy";

import { Pencil, Trash } from "lucide-react";
import PolicyDialog from "./PolicyDialog";
import {
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import {
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@/components/ui/table";

interface PolicyTableProps {
  onDateChange: (field: keyof IPolicy, date: Date | undefined) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick: (policy: IPolicy) => void;
  onDelete: (id: number) => void;
  onCancelEdit: () => void;
  onUpdate: () => void;
  formData: Partial<IPolicy>;
  editingId: number | null;
  fieldNames: string[];
  policies: IPolicy[];
  isLoading: boolean;
}

const PolicyTable = (props: PolicyTableProps) => {
  const {
    onCancelEdit,
    onEditClick,
    onChange,
    onUpdate,
    onDelete,
    fieldNames,
    isLoading,
    formData,
    policies,
  } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#242322] rounded-t-md text-[#fafafa]">
          <TableHead className="rounded-tl-md">No Polis</TableHead>
          <TableHead>Nama Tertanggung</TableHead>
          <TableHead>Periode</TableHead>
          <TableHead>Nama Item</TableHead>
          <TableHead>Harga Pertanggungan</TableHead>
          <TableHead>Harga Premi</TableHead>
          <TableHead className="rounded-tr-md">Edit & Hapus</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {policies.length > 0 ? (
          policies.map((policy) => (
            <TableRow key={policy.id}>
              <TableCell>{policy.policy_number}</TableCell>
              <TableCell>{policy.insured_name}</TableCell>
              <TableCell>
                {new Date(policy.effective_date).toLocaleDateString()} -
                <span className="ml-1">
                  {new Date(policy.expiry_date).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell>
                {policy.vehicle_brand} {policy.vehicle_type}
              </TableCell>
              <TableCell>
                {parseFloat(policy.vehicle_price).toLocaleString("id-ID")}
              </TableCell>
              <TableCell>
                {parseFloat(policy.premium_price).toLocaleString("id-ID")}
              </TableCell>
              <TableCell>
                <div className="gap-x-1 flex justify-center items-center">
                  <PolicyDialog
                    mode="edit"
                    trigger={
                      <div
                        className="bg-[#78D8D0] text-white rounded-md p-1 cursor-pointer"
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
                    onDateChange={props.onDateChange}
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
                          Apakah Anda benar-benar yakin?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini akan menghapus secara permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-[#F94C66] hover:bg-[#F94C66]/80 text-white"
                          onClick={() => onDelete(policy.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Hapus..." : "Hapus"}
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
              Tidak ada data tersedia
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PolicyTable;
