import { useEffect, useState } from "react";

import { fieldNames } from "@/utils/constant";

import { AlertDialog } from "@/components/ui/alert-dialog";
import PolicyDialog from "@/components/PolicyDialog";
import PolicyTable from "@/components/PolicyTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  createPolicy,
  updatePolicy,
  deletePolicy,
  getPolicy,
  IPolicy,
} from "@/utils/policy";

const Dashboard = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<IPolicy>>({});
  const [policies, setpolicies] = useState<IPolicy[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPolicy = async () => {
    try {
      const response = await getPolicy();
      setpolicies(response);
    } catch {
      toast("Upss, gagal menampilkan data");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      await createPolicy(formData as Omit<IPolicy, "id" | "policy_number">);
      await fetchPolicy();
      setFormData({});

      toast.success("Polis berhasil dibuat");
    } catch {
      toast.warning("Upss, tidak berhasil dibuat");
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
    } catch {
      toast.warning("Upss, polis tidak berhasil diperbaharui");
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
    } catch {
      toast.warning("Upss, polis tidak berhasil dihapus");
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
        <div className="flex w-full rounded-md p-2 justify-end items-end bg-[#f5f4f2] outline-2 outline-[#e2e1df]">
          <AlertDialog>
            <PolicyDialog
              mode="create"
              trigger={<Button>Tambah Polis</Button>}
              fieldNames={fieldNames}
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleCreate}
              isLoading={isLoading}
              onCancel={() => setFormData({})}
              onDateChange={(field, date) => {
                if (!date) return;

                const localDate = new Date(
                  date.getTime() - date.getTimezoneOffset() * 60000
                )
                  .toISOString()
                  .split("T")[0];

                setFormData((prev) => ({
                  ...prev,
                  [field]: localDate,
                }));
              }}
            />
          </AlertDialog>
        </div>

        <div className="flex flex-1 min-h-0 p-2 rounded-md bg-[#f5f4f2] outline-2 outline-[#e2e1df] overflow-y-auto">
          <PolicyTable
            policies={policies}
            isLoading={isLoading}
            formData={formData}
            fieldNames={fieldNames}
            onChange={handleInputChange}
            onEditClick={handleEditClick}
            onUpdate={handleUpdate}
            onCancelEdit={() => {
              setEditingId(null);
              setFormData({});
            }}
            onDelete={handleDelete}
            editingId={editingId}
            onDateChange={(field, date) => {
              if (!date) return;
              const localDate = new Date(
                date.getTime() - date.getTimezoneOffset() * 60000
              )
                .toISOString()
                .split("T")[0];

              setFormData((prev) => ({
                ...prev,
                [field]: localDate,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
