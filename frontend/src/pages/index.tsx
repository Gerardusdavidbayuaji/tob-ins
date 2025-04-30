import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  getPolicy,
  createPolicy,
  updatePolicy,
  deletePolicy,
  IPolicy,
} from "@/utils/policy";
import { toast } from "sonner";

const Dashboard = () => {
  const [isPolicies, setIsPolicies] = useState<IPolicy[]>([]);
  const [formData, setFormData] = useState<Partial<IPolicy>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form field names
  const fieldNames = [
    "insured_name",
    "effective_date",
    "expiry_date",
    "vehicle_brand",
    "vehicle_type",
    "vehicle_year",
    "vehicle_price",
    "premium_rate",
  ];

  const fetchPolicy = async () => {
    try {
      setIsLoading(true);
      const response = await getPolicy();
      setIsPolicies(response);
    } catch (error) {
      toast("Upss, something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      await createPolicy(formData as Omit<IPolicy, "id" | "policy_number">);
      await fetchPolicy();
      setFormData({});

      toast.success("Polis berhasil dibuat");
    } catch (error) {
      toast.warning("Upss, something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      setIsLoading(true);
      await updatePolicy(editingId, formData);
      await fetchPolicy();
      setEditingId(null);
      setFormData({});
      toast.success("Polis berhasil diperbaharui");
    } catch (error) {
      toast.warning("Upss, something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      await deletePolicy(id);
      await fetchPolicy();
      toast.success("Polis berhasil dihapus");
    } catch (error) {
      toast.warning("Upss, something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (policy: IPolicy) => {
    setEditingId(policy.id);
    setFormData({
      insured_name: policy.insured_name,
      effective_date: policy.effective_date,
      expiry_date: policy.expiry_date,
      vehicle_brand: policy.vehicle_brand,
      vehicle_type: policy.vehicle_type,
      vehicle_year: policy.vehicle_year,
      vehicle_price: policy.vehicle_price,
      premium_rate: policy.premium_rate,
    });
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen main-color">
      <div className="flex flex-col p-6 gap-y-3 flex-1 min-h-0">
        {/* Create Policy Dialog */}
        <div className="flex w-full rounded-md p-2 justify-end items-end second-color">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Create Polis</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {fieldNames.map((field) => (
                    <Input
                      key={field}
                      name={field}
                      placeholder={field.replace("_", " ")}
                      value={formData[field as keyof typeof formData] || ""}
                      onChange={handleInputChange}
                    />
                  ))}
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setFormData({})}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleCreate} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Create"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Policy Table */}
        <div className="flex flex-1 min-h-0 p-2 rounded-md second-color overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#242322] rounded-t-md text-[#fafafa]">
                <TableHead className="w-1/7 text-[#fafafa] text-center rounded-tl-md">
                  No Polis
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Nama Tertanggung
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Periode
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Nama Item
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Harga Pertanggungan
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center">
                  Harga Premi
                </TableHead>
                <TableHead className="w-1/7 text-[#fafafa] text-center rounded-tr-md">
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
              ) : isPolicies.length > 0 ? (
                isPolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="text-center">
                      {policy.policy_number}
                    </TableCell>
                    <TableCell className="text-center">
                      {policy.insured_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(policy.effective_date).toLocaleDateString()} -
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
                        {/* Edit Button */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <div
                              className="bg-[#53BF9D] text-[#fafafa] rounded-md p-1 cursor-pointer"
                              onClick={() => handleEditClick(policy)}
                            >
                              <Pencil className="w-5 h-5" />
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <div className="grid grid-cols-2 gap-4">
                                {fieldNames.map((field) => (
                                  <Input
                                    key={field}
                                    name={field}
                                    placeholder={field.replace("_", " ")}
                                    value={
                                      formData[
                                        field as keyof typeof formData
                                      ] || ""
                                    }
                                    onChange={handleInputChange}
                                  />
                                ))}
                              </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => {
                                  setEditingId(null);
                                  setFormData({});
                                }}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleUpdate}
                                disabled={isLoading}
                              >
                                {isLoading ? "Updating..." : "Update"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* Delete Button */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <div className="bg-[#F94C66] text-[#fafafa] rounded-md p-1 cursor-pointer">
                              <Trash className="w-5 h-5" />
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the policy.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-[#F94C66] hover:bg-[#F94C66]/80 text-white"
                                onClick={() => handleDelete(policy.id)}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
