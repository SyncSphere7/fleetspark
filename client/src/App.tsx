import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth.store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import Drivers from './pages/Drivers';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Financing from './pages/Financing';
import Insurance from './pages/Insurance';
import RiderPortal from './pages/RiderPortal';

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, token } = useAuthStore();
  if (!token || !user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  const { token } = useAuthStore();
  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/vehicles" element={<ProtectedRoute roles={['ADMIN','FLEET_MANAGER','VIEWER']}><Vehicles /></ProtectedRoute>} />
      <Route path="/vehicles/:id" element={<ProtectedRoute roles={['ADMIN','FLEET_MANAGER','VIEWER']}><VehicleDetail /></ProtectedRoute>} />
      <Route path="/drivers" element={<ProtectedRoute roles={['ADMIN','FLEET_MANAGER','VIEWER']}><Drivers /></ProtectedRoute>} />
      <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute roles={['ADMIN','FLEET_MANAGER','VIEWER']}><Reports /></ProtectedRoute>} />
      <Route path="/financing" element={<ProtectedRoute roles={['ADMIN','FLEET_MANAGER']}><Financing /></ProtectedRoute>} />
      <Route path="/insurance" element={<ProtectedRoute roles={['ADMIN','FLEET_MANAGER']}><Insurance /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute roles={['ADMIN']}><Settings /></ProtectedRoute>} />
      <Route path="/rider" element={<ProtectedRoute roles={['DRIVER']}><RiderPortal /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}
