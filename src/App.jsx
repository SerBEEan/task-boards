import { Routes, Route } from 'react-router-dom';
import TicketPage from './pages/Ticket';
import MainPage from './pages/Main';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/full/:ticketId" element={<TicketPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
