import { StatusCodes } from 'http-status-codes';

import cache from '../cache';
import TicketsService from '../services/tickets.service';
import UsersService from '../services/users.service';
import { mapTicket, mapTickets } from '../helpers/tickets.helper';
import { buildTicketsCollaoratorsKey } from '../helpers/cache.helper';

const getTicketsIamCollaborator = async (req, res) => {
  const ticketsService = new TicketsService();
  const usersService = new UsersService();
  const userId = req.headers['user-id'];

  const tickets = await ticketsService.getTicketsByCollaboratorsUserId(userId);
  const usersIds = new Set(tickets.map((ticket) => ticket.email_cc_ids).flat());
  const users = await usersService.getUsers([...usersIds]);

  res.status(StatusCodes.OK).json({
    tickets: mapTickets(tickets, users),
  });
};

const removeTicketCollaborators = async (req, res) => {
  const ticketsService = new TicketsService();
  const usersService = new UsersService();
  const userId = +req.headers['user-id'];
  const ticketId = req.params.ticketId;

  const ticket = await ticketsService.getTicket(ticketId);
  const collaboratorsIds = ticket.collaborator_ids.filter(
    (id) => id !== userId
  );
  const [updatedTicket, users] = await Promise.all([
    ticketsService.updateTicket(ticketId, {
      collaborator_ids: collaboratorsIds,
    }),
    usersService.getUsers(collaboratorsIds),
  ]);

  res.status(StatusCodes.OK).json(mapTicket(updatedTicket, users));
  await cache.del(buildTicketsCollaoratorsKey(userId));
};

export { getTicketsIamCollaborator, removeTicketCollaborators };
