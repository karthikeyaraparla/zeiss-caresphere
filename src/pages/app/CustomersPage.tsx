import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2,
  Building2, Mail, Phone, Globe, ChevronLeft, ChevronRight,
  Users, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { mockCustomers } from '@/lib/mock-data';
import type { Customer } from '@/types';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 5;

const tierStyles: Record<string, string> = {
  enterprise: 'bg-primary/10 text-primary border-primary/20',
  business: 'bg-success/10 text-success border-success/20',
  starter: 'bg-muted text-muted-foreground border-border',
};

const statusStyles: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-border',
  pending: 'bg-warning/10 text-warning-foreground border-warning/20',
};

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = mockCustomers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Customers"
        subtitle={`${mockCustomers.length} enterprise customers registered`}
        icon={<Users className="size-5" />}
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="size-4" />
            Add Customer
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: mockCustomers.length, color: 'text-foreground' },
          { label: 'Active', value: mockCustomers.filter(c => c.status === 'active').length, color: 'text-success' },
          { label: 'Enterprise', value: mockCustomers.filter(c => c.tier === 'enterprise').length, color: 'text-primary' },
          { label: 'Pending', value: mockCustomers.filter(c => c.status === 'pending').length, color: 'text-warning-foreground' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="pt-4 pb-4">
                <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="size-4" />
            Filter
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {paged.length === 0 ? (
            <EmptyState
              icon={<Users className="size-6" />}
              title="No customers found"
              description="Try adjusting your search or add a new customer."
              action={{ label: 'Add Customer', onClick: () => {} }}
            />
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Customer', 'Company / Industry', 'Contact', 'Assets', 'Tier', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paged.map((customer, i) => (
                    <motion.tr
                      key={customer.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.city}, {customer.country}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{customer.company}</p>
                        <p className="text-xs text-muted-foreground">{customer.industry}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <a href={`mailto:${customer.email}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                            <Mail className="size-3" />{customer.email}
                          </a>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="size-3" />{customer.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">{customer.assetCount}</span>
                          <span className="text-xs text-muted-foreground">{customer.openTickets} open tickets</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cn('text-xs font-medium capitalize', tierStyles[customer.tier])}>
                          {customer.tier}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cn('text-xs font-medium capitalize', statusStyles[customer.status])}>
                          {customer.status === 'active' && <CheckCircle2 className="size-3 mr-1" />}
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelected(customer)}>
                              <Eye className="size-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="size-4 mr-2" /> Edit
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} customers
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
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
              <Button
                variant="outline"
                size="icon-sm"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Customer detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {selected.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{selected.name}</CardTitle>
                    <CardDescription>{selected.company}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon-sm" onClick={() => setSelected(null)}>✕</Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  {[
                    { label: 'Industry', value: selected.industry, icon: Building2 },
                    { label: 'Location', value: `${selected.city}, ${selected.country}`, icon: Globe },
                    { label: 'Contract', value: `${selected.contractStart} → ${selected.contractEnd}`, icon: CheckCircle2 },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-start gap-2">
                      <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="font-medium text-foreground">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
