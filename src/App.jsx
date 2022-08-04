import { Routes, Route, Navigate } from 'react-router-dom';
import TicketPage from './pages/Ticket';
import MainPage from './pages/Main';
import NotFound from './pages/NotFound';
import { Paths } from './constants';

export default function App() {
    return (
        <Routes>
            <Route path={Paths.main} element={<MainPage />} />
            <Route path={Paths.mainModalCreate} element={<MainPage />} />
            <Route path={Paths.mainModalEdit} element={<MainPage />} />
            <Route path={Paths.ticket} element={<TicketPage />} />
            <Route path={Paths.ticketModalCreateComment} element={<TicketPage />} />
            <Route path={Paths.notFound} element={<NotFound />} />
            <Route path="*" element={<Navigate to={Paths.notFound} />} />
        </Routes>
    );
}
