import { useAuthStore } from '../stores/auth.store';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">⚡ FleetSpark</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.name} ({user?.role})</span>
          <button onClick={logout} className="text-sm bg-blue-800 px-3 py-1 rounded hover:bg-blue-700">Logout</button>
        </div>
      </nav>
      <main className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">Total Vehicles</p>
            <p className="text-3xl font-bold text-blue-600">—</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">Active Now</p>
            <p className="text-3xl font-bold text-green-600">—</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">Charging</p>
            <p className="text-3xl font-bold text-blue-500">—</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">Alerts</p>
            <p className="text-3xl font-bold text-red-500">—</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-gray-500 text-center py-12">Dashboard data loading... Connect to backend to see live data.</p>
        </div>
      </main>
    </div>
  );
}
