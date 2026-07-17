import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2,
  Package, ChevronLeft, ChevronRight, Wrench, Calendar,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { ConditionBadge, AssetStatusBadge } from '@/components/shared/Badges';
import { mockAssets } from '@/lib/mock-data';
import type { Asset, AssetCategory } from '@/types';

const ITEMS_PER_PAGE = 6;

const categories: AssetCategory[] = [
  'Microscopy', 'Ophthalmology', 'Semiconductor', 'Industrial Metrology',
  'Surgical Systems', 'Vision Care', 'Research Systems', 'Other',
];

const assetSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(1),
  modelNumber: z.string().min(1),
  serialNumber: z.string().min(1),
  purchaseDate: z.string().min(1),
  warrantyExpiry: z.string().min(1),
  usageHours: z.number().min(0),
  condition: z.string().min(1),
  lastMaintenance: z.string().min(1),
  location: z.string().min(1),
  issueDescription: z.string().optional(),
});
type AssetFormData = z.infer<typeof assetSchema>;

export default function AssetsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailAsset, setDetailAsset] = useState<Asset | null>(null);

  const filtered = assets.filter(a =>
    (a.name.toLowerCase().includes(search.toLowerCase()) ||
     a.customerName.toLowerCase().includes(search.toLowerCase()) ||
     a.serialNumber.toLowerCase().includes(search.toLowerCase())) &&
    (categoryFilter === 'all' || a.category === categoryFilter)
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
  });

  const onSubmit = (data: AssetFormData) => {
    const newAsset: Asset = {
      id: `a${Date.now()}`,
      customerId: 'c1',
      customerName: 'MedTech Solutions GmbH',
      nextMaintenanceDue: '',
      firmware: '',
      status: 'operational',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(data as Omit<Asset, 'id' | 'customerId' | 'customerName' | 'nextMaintenanceDue' | 'firmware' | 'status' | 'createdAt' | 'updatedAt'>),
      category: data.category as AssetCategory,
    };
    setAssets(prev => [newAsset, ...prev]);
    setDialogOpen(false);
    reset();
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Assets"
        subtitle={`Managing ${assets.length} registered equipment assets`}
        icon={<Package className="size-5" />}
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
            <Plus className="size-4" />
            Add Asset
          </Button>
        }
      />

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={categoryFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => { setCategoryFilter('all'); setPage(1); }}
        >
          All ({assets.length})
        </Button>
        {categories.map(cat => {
          const count = assets.filter(a => a.category === cat).length;
          if (!count) return null;
          return (
            <Button
              key={cat}
              variant={categoryFilter === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => { setCategoryFilter(cat); setPage(1); }}
            >
              {cat} ({count})
            </Button>
          );
        })}
      </div>

      <Card>
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="size-4" /> Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          {paged.length === 0 ? (
            <EmptyState
              icon={<Package className="size-6" />}
              title="No assets found"
              description="Add your first asset to start tracking equipment and getting AI analysis."
              action={{ label: 'Add Asset', onClick: () => setDialogOpen(true) }}
            />
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Asset Name', 'Category', 'Model / Serial', 'Customer', 'Usage', 'Condition', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paged.map((asset, i) => (
                    <motion.tr
                      key={asset.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Package className="size-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{asset.name}</p>
                            <p className="text-xs text-muted-foreground">{asset.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-foreground">{asset.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-mono text-foreground">{asset.modelNumber}</p>
                        <p className="text-xs font-mono text-muted-foreground">{asset.serialNumber}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-foreground">{asset.customerName}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">{asset.usageHours.toLocaleString()}h</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="size-3" />
                            {asset.lastMaintenance}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <ConditionBadge condition={asset.condition} />
                      </td>
                      <td className="px-4 py-3">
                        <AssetStatusBadge status={asset.status} />
                      </td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setDetailAsset(asset)}>
                              <Eye className="size-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="size-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Wrench className="size-4 mr-2" /> Request Maintenance
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive">
                              <Trash2 className="size-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} assets
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft className="size-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={page === i + 1 ? 'default' : 'outline'}
                  size="icon-sm"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button variant="outline" size="icon-sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Detail panel */}
      <AnimatePresence>
        {detailAsset && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">{detailAsset.name}</CardTitle>
                  <CardDescription>{detailAsset.category} · {detailAsset.customerName}</CardDescription>
                </div>
                <Button variant="ghost" size="icon-sm" onClick={() => setDetailAsset(null)}>
                  <X className="size-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {[
                    { label: 'Model Number', value: detailAsset.modelNumber },
                    { label: 'Serial Number', value: detailAsset.serialNumber },
                    { label: 'Purchase Date', value: detailAsset.purchaseDate },
                    { label: 'Warranty Expiry', value: detailAsset.warrantyExpiry },
                    { label: 'Usage Hours', value: `${detailAsset.usageHours.toLocaleString()}h` },
                    { label: 'Last Maintenance', value: detailAsset.lastMaintenance },
                    { label: 'Next Maintenance', value: detailAsset.nextMaintenanceDue || 'N/A' },
                    { label: 'Firmware', value: detailAsset.firmware || 'N/A' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                      <p className="font-medium text-foreground font-mono text-xs">{value}</p>
                    </div>
                  ))}
                </div>
                {detailAsset.issueDescription && (
                  <div className="mt-4 p-3 bg-warning/5 border border-warning/20 rounded-xl">
                    <p className="text-xs font-semibold text-warning-foreground mb-1">Reported Issue</p>
                    <p className="text-xs text-muted-foreground">{detailAsset.issueDescription}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Asset Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Register New Asset</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label>Asset Name *</Label>
                <Input placeholder="e.g. ZEISS Axio Observer 7" {...register('name')} aria-invalid={!!errors.name} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select onValueChange={v => setValue('category', v)}>
                  <SelectTrigger aria-invalid={!!errors.category}><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Model Number *</Label>
                <Input placeholder="e.g. AO7-2023-PRO" {...register('modelNumber')} aria-invalid={!!errors.modelNumber} />
              </div>
              <div className="space-y-1.5">
                <Label>Serial Number *</Label>
                <Input placeholder="e.g. ZSS-AO7-00391" {...register('serialNumber')} aria-invalid={!!errors.serialNumber} />
              </div>
              <div className="space-y-1.5">
                <Label>Purchase Date *</Label>
                <Input type="date" {...register('purchaseDate')} />
              </div>
              <div className="space-y-1.5">
                <Label>Warranty Expiry *</Label>
                <Input type="date" {...register('warrantyExpiry')} />
              </div>
              <div className="space-y-1.5">
                <Label>Usage Hours *</Label>
                <Input type="number" placeholder="0" {...register('usageHours', { valueAsNumber: true })} />
              </div>
              <div className="space-y-1.5">
                <Label>Current Condition *</Label>
                <Select onValueChange={v => setValue('condition', v)}>
                  <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                  <SelectContent>
                    {['excellent', 'good', 'fair', 'poor', 'critical'].map(c => (
                      <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Last Maintenance *</Label>
                <Input type="date" {...register('lastMaintenance')} />
              </div>
              <div className="space-y-1.5">
                <Label>Location *</Label>
                <Input placeholder="e.g. Lab 3A, Munich HQ" {...register('location')} />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Issue Description (optional)</Label>
                <Textarea
                  placeholder="Describe any known issues or symptoms..."
                  rows={3}
                  {...register('issueDescription')}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Register Asset</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
