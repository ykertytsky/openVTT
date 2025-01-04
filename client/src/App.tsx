import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes'; // Your routing component
import NavBarLayout from './components/NavbarLayout'; // Your navbar component



const App: React.FC = () => (
  <BrowserRouter>
    <NavBarLayout /> {/* Global Navbar */}
    <main style={{ marginTop: '64px', padding: '16px' }}>
    <AppRoutes />    {/* Routing */}
    </main>
  </BrowserRouter>
);

export default App;