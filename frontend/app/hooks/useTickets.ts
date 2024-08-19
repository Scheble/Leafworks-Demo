import { removeTicketIamCollaborator } from '../actions/tickets.actions';
import { ITicket } from '../interfaces/ticket.interface';
import { useState } from 'react';

export const useTickets = (initTickets: ITicket[]) => {
  const [tickets, setTickets] = useState(initTickets);

  const deleteIamCollaborator = async (ticketId: number) => {
    await removeTicketIamCollaborator(ticketId);
    setTickets(tickets.filter(({ id }) => id !== ticketId));
  };

  return {
    tickets,
    deleteIamCollaborator,
  };
};
