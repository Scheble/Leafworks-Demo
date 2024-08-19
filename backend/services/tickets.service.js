import ZendeskService from './zendesk.service';
import cache from '../cache';
import { buildTicketsCollaoratorsKey } from '../helpers/cache.helper';

export default class TicketsService {
  constructor() {
    this.zendeskService = new ZendeskService();
  }

  async getTicket(ticketId) {
    return this.zendeskService.getTicket(ticketId);
  }

  async getTicketsByCollaboratorsUserId(userId) {
    const ticketsCache = await cache.get(buildTicketsCollaoratorsKey(userId));
    if (ticketsCache) {
      return JSON.parse(ticketsCache);
    }

    const tickets = await this.zendeskService.getTicketsByCollaboratorsUserId(
      userId
    );

    await cache.set(
      buildTicketsCollaoratorsKey(userId),
      JSON.stringify(tickets)
    );
    return tickets;
  }

  updateTicket(ticketId, ticket) {
    return this.zendeskService.updateTicket(ticketId, ticket);
  }
}
