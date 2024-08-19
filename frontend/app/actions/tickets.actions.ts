import { ITicket } from '../interfaces/ticket.interface';
import { fetchServer } from '../utils/fetch.utils';

export const getTicketsIamCollaborator = () =>
  fetchServer<{ tickets: ITicket[] }>('me/tickets/ccd');

export const removeTicketIamCollaborator = (ticketId: number) =>
  fetchServer<ITicket>(`me/tickets/${ticketId}/ccd`, {
    method: 'DELETE',
  });
