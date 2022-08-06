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
        const { title, status, description, tags, comments } = ticketData;

        const oldTicketData = db.tickets[id];

        db.tickets[id] = {
            title: title === undefined ? oldTicketData.title : title,
            status: status === undefined ? oldTicketData.status : status,
            description: description === undefined ? oldTicketData.description : description,
            tags: tags === undefined ? oldTicketData.tags : tags,
            comments: comments === undefined ? oldTicketData.comments : this.__indexComments(comments, db),
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

    __indexComments(comments, db) {
        return comments.map((comment) => {
            if (comment.id !== undefined) {
                return comment;
            }

            const id = db.newCommentId;
            db.newCommentId += 1;
            return { ...comment, id };
        });
    }

    __getDb() {
        return JSON.parse(localStorage.getItem(TICKETS_KEY) ?? DEFAULT_DB);
    }

    __setDb(db) {
        localStorage.setItem(TICKETS_KEY, JSON.stringify(db));
    }
}
const db = new DataBase();


function makeResponse(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    }); 
}

export function getFilteredTicketsRequest(filters) {
    const tickets = db.getTickets();

    let ticketIdsByCommentFilter = tickets.map((ticket) => ticket.id);
    let ticketIdsByDescriptionFilter = tickets.map((ticket) => ticket.id);
    let ticketIdsByTagFilter = tickets.map((ticket) => ticket.id);

    for (const filter of filters) {
        if (filter === Filter.comment) {
            ticketIdsByCommentFilter = tickets.filter((ticket) => ticket.comments.length > 0).map((ticket) => ticket.id);
        } else if (filter === Filter.description) {
            ticketIdsByDescriptionFilter = tickets.filter((ticket) => ticket.description !== '').map((ticket) => ticket.id);
        } else if (filter === Filter.tag) {
            ticketIdsByTagFilter = tickets.filter((ticket) => ticket.tags.length > 0).map((ticket) => ticket.id);
        }
    }

    const filteredTickets = tickets.filter((ticket) => {
        const isComment = ticketIdsByCommentFilter.includes(ticket.id);
        const isDescription = ticketIdsByDescriptionFilter.includes(ticket.id);
        const isTag = ticketIdsByTagFilter.includes(ticket.id);

        return isComment && isDescription && isTag;
    });
    
    return makeResponse(filteredTickets.map((ticket) => ({
        ...ticket,
        id: Number(ticket.id),
        comments: ticket.comments.map((comment) => ({ ...comment, id: Number(comment.id) }))
    })));
}

export function getTicketByIdRequest(id) {
    const ticket = db.getTickets().find((ticket) => ticket.id === String(id));
    return makeResponse(ticket ? {
        ...ticket,
        id: Number(ticket.id),
        comments: ticket.comments.map((comment) => ({ ...comment, id: Number(comment.id) })),
    } : null);
}

export function createTicketRequest(data) {
    return makeResponse(db.createTicket(buildTicketModel({
        title: data.title,
        description: data.description,
        status: data.status,
        tags: data.tags,
        comments: [],
    })));
}

export function updateTicketRequest(id, data) {
    return makeResponse(db.updateTicket(id, buildTicketModel({
        title: data.title,
        description: data.description,
        status: data.status,
        tags: data.tags,
        comments: data.comments,
    })));
}

export function deleteTicketRequest(id) {
    return makeResponse(db.removeTicker(id));
}
