import { combineReducers, configureStore } from '@reduxjs/toolkit';
import TicketsSlice from './TicketsSlice';

const reducers = {
    ticketsState: TicketsSlice,
};

const store = configureStore({
    reducer: combineReducers({ ...reducers }),
});

export default store;
