import { createTicketRequest, deleteTicketRequest, updateTicketRequest, getTicketByIdRequest, getFilteredTicketsRequest } from './db';

class TicketsAPI {
    async createTicket(data) {
        return await createTicketRequest(data);
    }

    async getFilteredTickets(filters) {
        return await getFilteredTicketsRequest(filters);
    }

    async getTicketById(id) {
        return await getTicketByIdRequest(id);
    }

    async updateTicket(id, data) {
        return await updateTicketRequest(id, data);
    }

    async deleteTicket(id) {
        return await deleteTicketRequest(id);
    }
}

export const ticketsAPI = new TicketsAPI();
