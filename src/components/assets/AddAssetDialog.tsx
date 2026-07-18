import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createAsset } from "@/services/assetService";
import { getCustomerList } from "@/services/customerService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAssetDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [customers, setCustomers] = useState<any[]>([]);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    customer_id: "",
    asset_name: "",
    serial_number: "",
    device_type: "",
    installation_date: "",
    warranty_end: "",
    health_status: "Healthy",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const data = await getCustomerList();
    setCustomers(data ?? []);
  }

  async function handleSave() {
    try {
      setSaving(true);

      await createAsset(form);

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">

        <DialogHeader>
          <DialogTitle>Add Asset</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Customer</Label>

            <Select
              onValueChange={(value) =>
                setForm({ ...form, customer_id: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>

              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Asset Name</Label>

            <Input
              value={form.asset_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  asset_name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Serial Number</Label>

            <Input
              value={form.serial_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  serial_number: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Device Type</Label>

            <Input
              value={form.device_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  device_type: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Installation Date</Label>

            <Input
              type="date"
              value={form.installation_date}
              onChange={(e) =>
                setForm({
                  ...form,
                  installation_date: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Warranty End</Label>

            <Input
              type="date"
              value={form.warranty_end}
              onChange={(e) =>
                setForm({
                  ...form,
                  warranty_end: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Health Status</Label>

            <Select
              defaultValue="Healthy"
              onValueChange={(value) =>
                setForm({
                  ...form,
                  health_status: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Healthy">
                  Healthy
                </SelectItem>

                <SelectItem value="Warning">
                  Warning
                </SelectItem>

                <SelectItem value="Critical">
                  Critical
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Asset"}
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}