import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ticketsAPI } from '../api/ticketsApi';

const filteredTicketsAdapter = createEntityAdapter();

const initialState = {
    tickets: filteredTicketsAdapter.getInitialState({
        loading: false,
        sending: false,
    }),
    currentTicket: null,
};

export const getFilteredTickets = createAsyncThunk(
    'tickets/getFilteredTickets',
    async (filters) => {
        return await ticketsAPI.getFilteredTickets(filters);
    },
);

export const getTicketById = createAsyncThunk(
    'tickets/getTicketById',
    async (id) => {
        return await ticketsAPI.getTicketById(id);
    }
);

export const createTicket = createAsyncThunk(
    'tickets/createTicket',
    async (ticketData) => {
        const response = await ticketsAPI.createTicket(ticketData);

        if (typeof response !== 'number') {
            throw new Error('No success');
        }

        return response;
    },
);

export const updateTicketStatus = createAsyncThunk(
    'tickets/updateTicketStatus',
    async ({ id, status }, { dispatch }) => {
        dispatch(filteredTicketsActions.changeTicketStatus({
            id,
            changes: { status },
        }));

        const response = await ticketsAPI.updateTicket(id, { status });

        if (typeof response !== 'number') {
            throw new Error('No success');
        }

        return response;
    },
);

export const updateTicket = createAsyncThunk(
    'tickets/updateTicket',
    async ({ id, ...data }) => {
        const response = await ticketsAPI.updateTicket(id, data);

        if (typeof response !== 'number') {
            throw new Error('No success');
        }

        return response;
    },
);

export const deleteTicket = createAsyncThunk(
    'tickets/deleteTicket',
    async ({ id }) => {
        const response = await ticketsAPI.deleteTicket(id);

        if (typeof response !== 'number') {
            throw new Error('No success');
        }

        return response;
    },
);


const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        changeTicketStatus: (state, action) => {
            const { id, changes } = action.payload;
            filteredTicketsAdapter.updateOne(state.tickets, { id, changes });
        },
        clearCurrentTicket: (state) => {
            state.currentTicket = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFilteredTickets.pending, (state) => {
            state.tickets.loading = true;
        });
        builder.addCase(getFilteredTickets.fulfilled, (state, action)  => {
            state.tickets.loading = false;
            filteredTicketsAdapter.setAll(state.tickets, action.payload);
        });
        builder.addCase(getFilteredTickets.rejected, (state) => {
            state.tickets.loading = false;
        });

        builder.addCase(createTicket.pending, (state) => {
            state.tickets.sending = true;
        });
        builder.addCase(createTicket.fulfilled, (state)  => {
            state.tickets.sending = false;
        });
        builder.addCase(createTicket.rejected, (state) => {
            state.tickets.sending = false;
        });

        builder.addCase(updateTicket.pending, (state) => {
            state.tickets.sending = true;
        });
        builder.addCase(updateTicket.fulfilled, (state)  => {
            state.tickets.sending = false;
        });
        builder.addCase(updateTicket.rejected, (state) => {
            state.tickets.sending = false;
        });

        builder.addCase(getTicketById.pending, (state) => {
            state.tickets.loading = true;
        });
        builder.addCase(getTicketById.fulfilled, (state, action)  => {
            state.tickets.loading = false;
            state.currentTicket = action.payload;
        });
        builder.addCase(getTicketById.rejected, (state) => {
            state.tickets.loading = false;
        });

        builder.addCase(deleteTicket.pending, (state) => {
            state.tickets.sending = true;
        });
        builder.addCase(deleteTicket.fulfilled, (state, action)  => {
            state.tickets.sending = false;
        });
        builder.addCase(deleteTicket.rejected, (state) => {
            state.tickets.sending = false;
        });
    },
});

export const filteredTicketsActions = ticketsSlice.actions;

export const filteredTicketsSelectors = {
    selectLoading: (state) => {
        return state.ticketsState.tickets.loading;
    },
    selectSending: (state) => {
        return state.ticketsState.tickets.sending;
    },
    selectCurrentTicket: (state) => {
        return state.ticketsState.currentTicket;
    },
    ...filteredTicketsAdapter.getSelectors((state) => state.ticketsState.tickets),
};

export default ticketsSlice.reducer;
