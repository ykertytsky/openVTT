import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Updated imports

import HomePage from './pages/HomePage';

import ActiveSessionPage from './pages/ActiveSessionPage';
import CampaignsPage from './pages/CampaignsPage';

import NotFoundPage from './pages/NotFoundPage';

import Login from './pages/Login/LoginPage';

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Use `element` prop to render components */}
    <Route path="/home" element={<HomePage />} />
    <Route path="/active_session" element={<ActiveSessionPage />} />
    <Route path="/campaigns" element={<CampaignsPage />} />

    <Route path="/login" element={<Login/>}></Route>
    {/* Catch-all route for 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;