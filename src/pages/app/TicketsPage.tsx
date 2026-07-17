import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, MoreHorizontal, Eye, Edit, Clock,
  TicketCheck, MessageSquare, User, AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { StatusBadge, PriorityBadge } from '@/components/shared/Badges';
import { mockTickets } from '@/lib/mock-data';
import type { SupportTicket, TicketStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusTabs: { label: string; value: TicketStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Closed', value: 'closed' },
];

export default function TicketsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [selected, setSelected] = useState<SupportTicket | null>(null);

  const filtered = mockTickets.filter(t =>
    (statusFilter === 'all' || t.status === statusFilter) &&
    (t.title.toLowerCase().includes(search.toLowerCase()) ||
     t.customerName.toLowerCase().includes(search.toLowerCase()))
  );

  const counts: Record<string, number> = {
    all: mockTickets.length,
    open: mockTickets.filter(t => t.status === 'open').length,
    in_progress: mockTickets.filter(t => t.status === 'in_progress').length,
    resolved: mockTickets.filter(t => t.status === 'resolved').length,
    closed: mockTickets.filter(t => t.status === 'closed').length,
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Support Tickets"
        subtitle="Track and manage customer support requests"
        icon={<TicketCheck className="size-5" />}
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="size-4" />
            New Ticket
          </Button>
        }
      />

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map(tab => (
          <Button
            key={tab.value}
            variant={statusFilter === tab.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(tab.value)}
            className="whitespace-nowrap"
          >
            {tab.label}
            <Badge
              variant={statusFilter === tab.value ? 'secondary' : 'outline'}
              className={cn('ml-1.5 text-xs h-4 min-w-4 px-1', statusFilter === tab.value && 'bg-primary-foreground/20 text-primary-foreground border-none')}
            >
              {counts[tab.value]}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {filtered.length === 0 ? (
            <Card>
              <EmptyState
                icon={<TicketCheck className="size-6" />}
                title="No tickets found"
                description="Create a new support ticket or adjust your filters."
              />
            </Card>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {filtered.map((ticket, i) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Card
                      className={cn(
                        'cursor-pointer hover:shadow-premium transition-all duration-200 hover:border-primary/30',
                        selected?.id === ticket.id && 'border-primary/50 bg-primary/2'
                      )}
                      onClick={() => setSelected(ticket)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={cn('mt-0.5 size-2.5 rounded-full shrink-0',
                              ticket.priority === 'critical' ? 'bg-destructive' :
                              ticket.priority === 'high' ? 'bg-orange-500' :
                              ticket.priority === 'medium' ? 'bg-warning' : 'bg-muted-foreground'
                            )} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground line-clamp-1">{ticket.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{ticket.customerName}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <StatusBadge status={ticket.status} />
                                <PriorityBadge priority={ticket.priority} />
                                {ticket.comments.length > 0 && (
                                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MessageSquare className="size-3" />
                                    {ticket.comments.length}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon-sm" onClick={e => e.stopPropagation()}>
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem><Eye className="size-4 mr-2" /> View</DropdownMenuItem>
                                <DropdownMenuItem><Edit className="size-4 mr-2" /> Edit</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="size-3" />
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="sticky top-6">
                  <CardHeader className="border-b border-border pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-sm font-semibold leading-snug">{selected.title}</CardTitle>
                        <CardDescription className="mt-1">{selected.customerName}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon-sm" onClick={() => setSelected(null)}>✕</Button>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-2">
                      <StatusBadge status={selected.status} />
                      <PriorityBadge priority={selected.priority} />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Description</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {[
                        { label: 'Asset', value: selected.assetName || 'N/A', icon: AlertCircle },
                        { label: 'Assigned to', value: selected.assignedEngineer || 'Unassigned', icon: User },
                        { label: 'Created', value: new Date(selected.createdAt).toLocaleDateString(), icon: Clock },
                        { label: 'Due Date', value: selected.dueDate ? new Date(selected.dueDate).toLocaleDateString() : 'N/A', icon: Clock },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label}>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                            <Icon className="size-3" /> {label}
                          </p>
                          <p className="font-medium text-foreground text-xs">{value}</p>
                        </div>
                      ))}
                    </div>

                    {selected.tags.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selected.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selected.comments.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                          Comments ({selected.comments.length})
                        </p>
                        <div className="space-y-3">
                          {selected.comments.map(c => (
                            <div key={c.id} className="flex gap-2">
                              <Avatar className="size-7 shrink-0">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                  {c.authorName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-muted/40 rounded-xl px-3 py-2">
                                <p className="text-xs font-semibold text-foreground">{c.authorName}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{c.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">Update Status</Button>
                      <Button size="sm" variant="outline">Add Comment</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground"
              >
                <TicketCheck className="size-10 mb-3 opacity-30" />
                <p className="text-sm">Select a ticket to view details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
