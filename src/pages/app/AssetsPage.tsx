import { useEffect, useState } from "react";
import { Plus, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";

import { getAssets } from "@/services/assetService";
import type { Asset } from "@/types";

import AddAssetDialog from "@/components/assets/AddAssetDialog";
import { Badge } from "@/components/ui/badge";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
const [loading, setLoading] = useState(true);
const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    try {
      const data = await getAssets();
      setAssets(data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading assets...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Assets"
        subtitle={`${assets.length} assets registered`}
        icon={<Package className="size-5" />}
        actions={
          <Button onClick={() => setOpenAddDialog(true)}>
  <Plus className="size-4 mr-2" />
  Add Asset
</Button>
        }
      />

      <Card className="p-6">

        {assets.length === 0 ? (

          <p className="text-center text-muted-foreground">
            No assets found.
          </p>

        ) : (

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Asset</th>
                <th className="text-left">Customer</th>
                <th className="text-left">Type</th>
                <th className="text-left">Serial Number</th>
                <th className="text-left">Health</th>
              </tr>
            </thead>

            <tbody>
              {assets.map(asset => (
                <tr key={asset.id} className="border-b">

                  <td className="py-3">
                    {asset.asset_name}
                  </td>

                  <td>
                    {asset.customers?.company}
                  </td>

                  <td>
                    {asset.device_type}
                  </td>

                  <td>
                    {asset.serial_number}
                  </td>

                  <td>
  <Badge
    variant={
      asset.health_status === "Healthy"
        ? "default"
        : asset.health_status === "Warning"
        ? "secondary"
        : "destructive"
    }
  >
    {asset.health_status}
  </Badge>
</td>

                </tr>
              ))}
            </tbody>
          </table>

        )}

            </Card>

      <AddAssetDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSuccess={loadAssets}
      />

    </div>
  );
}