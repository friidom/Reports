import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from "./context/AuthContext";

import RootRedirect from './routes/RootRedirect';
import Login from './routes/Login';
import Dashboard from './pages/Dashboard.jsx';
import Layout from './components/Layout';
import Reports from './pages/Reports.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<Login />} />

            // Main routes
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="reports" element={<Reports />} />
              </Route>
            </Route>

          </Routes>
        </AuthContextProvider>
      </BrowserRouter >
    </>
  )
}

export default App;
