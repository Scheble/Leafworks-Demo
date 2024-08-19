import HttpService from './http.service';

export default class ZendeskService extends HttpService {
  constructor() {
    super(
      `${process.env.ZENDESK_BASE_URL}/api/${process.env.ZENDESK_API_VERSION}`
    );
    this.authToken = process.env.ZENDESK_AUTH_TOKEN;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    };
  }

  async getUsers(ids) {
    const { users } = await this.get(
      '/users/show_many.json',
      this.getHeaders(),
      {
        ids: ids.join(),
      }
    );
    return users;
  }

  async getTicket(ticketId) {
    const { ticket } = await this.get(
      `/tickets/${ticketId}`,
      this.getHeaders()
    );
    return ticket;
  }

  async getTicketsByCollaboratorsUserId(userId) {
    const { tickets } = await this.get(
      `users/${userId}/tickets/ccd`,
      this.getHeaders()
    );
    return tickets;
  }

  async updateTicket(ticketId, ticket) {
    const { ticket: updatedTicket } = await this.put(
      `/tickets/${ticketId}`,
      this.getHeaders(),
      { ticket }
    );
    return updatedTicket;
  }
}
