import { Routes, Route, Navigate } from 'react-router-dom';
import TicketPage from './pages/Ticket';
import MainPage from './pages/Main';
import NotFound from './pages/NotFound';
import { paths } from './constants';

export default function App() {
    return (
        <Routes>
            <Route path={paths.ticket} element={<TicketPage />} />
            <Route path={paths.main} element={<MainPage />} />
            <Route path={paths.mainModalCreate} element={<MainPage />} />
            <Route path={paths.mainModalEdit} element={<MainPage />} />
            <Route path={paths.notFound} element={<NotFound />} />
            <Route path="*" element={<Navigate to={paths.notFound} />} />
        </Routes>
    );
}
