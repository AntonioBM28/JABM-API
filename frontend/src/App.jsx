import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context';
import { Login } from './pages/auth';
import { ProtectedRoute, AdminRoute } from './guards';
import { AdminLayout } from './components/layout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirección por defecto al login si no está autenticado */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* ========================================
              RUTAS PROTEGIDAS GENERALES (Cualquier rol)
              ======================================== */}
          <Route element={<ProtectedRoute />}>
            {/* Panel del Usuario Normal */}
            <Route path="/user/tasks" element={<div className="text-white p-4">Mis Tareas (Próximamente)</div>} />
          </Route>

          {/* ========================================
              RUTAS EXCLUSIVAS DE ADMINISTRADOR
              ======================================== */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<div className="text-white p-4">Dashboard Admin (Próximamente)</div>} />
              <Route path="/admin/users" element={<div className="text-white p-4">Gestión de Usuarios (Próximamente)</div>} />
              <Route path="/admin/tasks" element={<div className="text-white p-4">Gestión de Tareas (Próximamente)</div>} />
              <Route path="/admin/audit" element={<div className="text-white p-4">Auditoría (Próximamente)</div>} />
            </Route>
          </Route>
          
          {/* Catch all para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
