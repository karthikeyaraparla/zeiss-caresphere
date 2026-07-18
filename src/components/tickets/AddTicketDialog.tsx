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

import { getAssetList } from "@/services/assetService";
import { createTicket } from "@/services/ticketService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTicketDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [assets, setAssets] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    asset_id: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    try {
      const data = await getAssetList();
      setAssets(data ?? []);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);

      await createTicket(form);

      onSuccess();
      onClose();

      setForm({
        asset_id: "",
        title: "",
        description: "",
        priority: "Medium",
        status: "Open",
      });
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
          <DialogTitle>Create Support Ticket</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Asset</Label>

            <Select
              onValueChange={(value) =>
                setForm({ ...form, asset_id: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Asset" />
              </SelectTrigger>

              <SelectContent>
                {assets.map((asset) => (
                  <SelectItem key={asset.id} value={asset.id}>
                    {asset.asset_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Title</Label>

            <Input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Description</Label>

            <Input
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Priority</Label>

            <Select
              defaultValue="Medium"
              onValueChange={(value) =>
                setForm({
                  ...form,
                  priority: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Status</Label>

            <Select
              defaultValue="Open"
              onValueChange={(value) =>
                setForm({
                  ...form,
                  status: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Create Ticket"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}