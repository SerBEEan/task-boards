import { Filter } from '../constants';
import { buildTicketModel } from '../utils/buildModel';

const TICKETS_KEY = 'tickets';
const DEFAULT_DB = JSON.stringify({ newTicketId: 1, newCommentId: 1, tickets: {} });

class DataBase {
    createTicket(ticketData) {
        const db = this.__getDb();
        const id = db.newTicketId;
        db.tickets[id] = ticketData;
        db.newTicketId += 1;
        this.__setDb(db);
        return id;
    }

    getTickets() {
        const db = this.__getDb();
        return Object.keys(db.tickets).map((id) => ({
            id,
            ...db.tickets[id],
        }));
    }

    updateTicket(id, ticketData) {
        const db = this.__getDb();
        const newComments = ticketData.comments.map((comment) => {
            if (comment.id !== undefined) {
                return comment;
            }

            const id = db.newCommentId;
            db.newCommentId += 1;
            return { ...comment, id };
        })
        db.tickets[id] = {
            ...ticketData,
            comments: newComments,
        };
        this.__setDb(db);
        return id;
    }

    removeTicker(id) {
        const db = this.__getDb();
        delete db.tickets[id];
        this.__setDb(db);
        return id;
    }

    __getDb() {
        return JSON.parse(localStorage.getItem(TICKETS_KEY) ?? DEFAULT_DB);
    }

    __setDb(db) {
        localStorage.setItem(TICKETS_KEY, JSON.stringify(db));
    }
}
const db = new DataBase();


function makeRequest(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    }); 
}

export function getFilteredTicketsRequest(filters) {
    let tickets = db.getTickets();

    for (const filter of filters) {
        if (filter === Filter.comment) {
            tickets = tickets.filter((ticket) => ticket.comments.length > 0);
        } else if (filter === Filter.description) {
            tickets = tickets.filter((ticket) => ticket.description !== '');
        } else if (filter === Filter.tag) {
            tickets = tickets.filter((ticket) => ticket.tags.length > 0);
        }
    }
    
    return makeRequest(tickets.map((ticket) => ({
        ...ticket,
        id: Number(ticket.id),
        comments: ticket.comments.map((comment) => ({ ...comment, id: Number(comment.id) }))
    })));
}

export function getTicketByIdRequest(id) {
    const ticket = db.getTickets().find((ticket) => ticket.id === String(id));
    return makeRequest(ticket ? {
        ...ticket,
        id: Number(ticket.id),
        comments: ticket.comments.map((comment) => ({ ...comment, id: Number(comment.id) })),
    } : null);
}

export function createTicketRequest(data) {
    return makeRequest(db.createTicket(buildTicketModel({
        title: data.title,
        description: data.description,
        status: data.status,
        tags: data.tags,
        comments: [],
    })));
}

export function updateTicketRequest(id, data) {
    return makeRequest(db.updateTicket(id, buildTicketModel({
        title: data.title,
        description: data.description,
        status: data.status,
        tags: data.tags,
        comments: data.comments,
    })));
}

export function deleteTicketRequest(id) {
    return makeRequest(db.removeTicker(id));
}
