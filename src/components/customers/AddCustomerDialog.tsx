import { useState } from "react";
import { createCustomer } from "@/services/customerService";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCustomerDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    country: "",
    city: "",
    tier: "business",
    status: "active",
    contract_start: "",
    contract_end: "",
  });
const [saving, setSaving] = useState(false);
function validate() {
  if (!form.name.trim()) {
    alert("Customer name is required");
    return false;
  }

  if (!form.company.trim()) {
    alert("Company is required");
    return false;
  }

  if (!form.email.trim()) {
    alert("Email is required");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    alert("Enter a valid email");
    return false;
  }

  return true;
}
  async function handleSave() {

  if (!validate()) return;

  try {

    setSaving(true);

    await createCustomer(form);

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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Register a new enterprise customer.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">

          <Input
            placeholder="Customer Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Input
            placeholder="Company"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">

            <Input
              placeholder="Country"
              value={form.country}
              onChange={(e) =>
                setForm({ ...form, country: e.target.value })
              }
            />

            <Input
              placeholder="City"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />

          </div>

         <div className="space-y-2">
  <Label>Industry</Label>

  <Input
    placeholder="Healthcare"
    value={form.industry}
    onChange={(e) =>
      setForm({ ...form, industry: e.target.value })
    }
  />
</div>
<div className="space-y-2">

  <Label>Customer Tier</Label>

  <Select
    value={form.tier}
    onValueChange={(value) =>
      setForm({ ...form, tier: value })
    }
  >
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="enterprise">
        Enterprise
      </SelectItem>

      <SelectItem value="business">
        Business
      </SelectItem>

      <SelectItem value="starter">
        Starter
      </SelectItem>
    </SelectContent>

  </Select>

</div>

<div className="space-y-2">

  <Label>Status</Label>

  <Select
    value={form.status}
    onValueChange={(value) =>
      setForm({ ...form, status: value })
    }
  >
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="active">
        Active
      </SelectItem>

      <SelectItem value="pending">
        Pending
      </SelectItem>

      <SelectItem value="inactive">
        Inactive
      </SelectItem>
    </SelectContent>

  </Select>

</div>
<div className="grid grid-cols-2 gap-4">

  <div className="space-y-2">
    <Label>Contract Start</Label>

    <Input
      type="date"
      value={form.contract_start}
      onChange={(e) =>
        setForm({ ...form, contract_start: e.target.value })
      }
    />
  </div>

  <div className="space-y-2">
    <Label>Contract End</Label>

    <Input
      type="date"
      value={form.contract_end}
      onChange={(e) =>
        setForm({ ...form, contract_end: e.target.value })
      }
    />
  </div>

</div>

        </div>

        <div className="flex justify-end gap-2">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
  onClick={handleSave}
  disabled={saving}
>
  {saving ? "Saving..." : "Save Customer"}
</Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}