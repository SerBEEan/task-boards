import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from '@reduxjs/toolkit';
import { ticketsAPI } from '../api/ticketsApi';
import { Filter } from '../constants';

const filteredTicketsAdapter = createEntityAdapter();

const initialState = {
    filters: [],
    tickets: filteredTicketsAdapter.getInitialState({
        loading: false,
        sending: false,
    }),
    currentTicket: null,
};

export const getFilteredTickets = createAsyncThunk(
    'tickets/getFilteredTickets',
    async (_, { getState }) => {
        const state = getState();
        return await ticketsAPI.getFilteredTickets(state.ticketsState.filters);
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


const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        changeFilter: (state, action) => {
            const { type, value } = action.payload;
            if (value) {
                state.filters.push(type);
            } else {
                state.filters = state.filters.filter((filter) => filter !== type);
            }
        },
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
    selectFilters: createSelector(
        (state) => state.ticketsState.filters,
        (filters) => ({
            [Filter.comment]: filters.includes(Filter.comment),
            [Filter.description]: filters.includes(Filter.description),
            [Filter.tag]: filters.includes(Filter.tag),
        })
    ),
    selectCurrentTicket: (state) => {
        return state.ticketsState.currentTicket;
    },
    ...filteredTicketsAdapter.getSelectors((state) => state.ticketsState.tickets),
};

export default ticketsSlice.reducer;
