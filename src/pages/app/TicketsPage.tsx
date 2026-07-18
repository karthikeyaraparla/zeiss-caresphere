import { useEffect, useState } from "react";
import { Plus, Ticket } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { PageHeader } from "@/components/shared/PageHeader";

import AddTicketDialog from "@/components/tickets/AddTicketDialog";

import { getTickets } from "@/services/ticketService";

import type { Ticket as TicketType } from "@/types";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    try {
      const data = await getTickets();
      setTickets(data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading tickets...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Support Tickets"
        subtitle={`${tickets.length} tickets`}
        icon={<Ticket className="size-5" />}
        actions={
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className="size-4 mr-2" />
            New Ticket
          </Button>
        }
      />

      <Card className="p-6">
        {tickets.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No tickets found.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Title</th>
                <th className="text-left">Asset</th>
                <th className="text-left">Priority</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b">
                  <td className="py-3">{ticket.title}</td>

                  <td>{ticket.assets?.asset_name}</td>

                  <td>
                    <Badge>{ticket.priority}</Badge>
                  </td>

                  <td>
                    <Badge variant="outline">
                      {ticket.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <AddTicketDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={loadTickets}
      />
    </div>
  );
}