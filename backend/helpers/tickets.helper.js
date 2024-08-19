import Ticket from '../models/ticket';

const mapTicket = (ticket, users) => {
  const ccUsers = users.filter(({ id }) => ticket.email_cc_ids.includes(id));
  return new Ticket(ticket, ccUsers);
};

const mapTickets = (tickets, users) =>
  tickets.map((ticket) => mapTicket(ticket, users));

export { mapTicket, mapTickets };
