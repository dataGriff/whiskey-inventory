import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OpenAPI } from './generated';
import WhiskeyList from './pages/WhiskeyList';
import WhiskeyDetail from './pages/WhiskeyDetail';
import WhiskeyCreate from './pages/WhiskeyCreate';
import './App.css';

// Configure the API client base URL
OpenAPI.BASE = 'http://localhost:3000/api';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/whiskeys" replace />} />
          <Route path="/whiskeys" element={<WhiskeyList />} />
          <Route path="/whiskeys/new" element={<WhiskeyCreate />} />
          <Route path="/whiskeys/:id" element={<WhiskeyDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
