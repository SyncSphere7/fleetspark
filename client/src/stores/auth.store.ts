import { create } from 'zustand';

interface User { id: string; email: string; name: string; role: string; orgId: string; }
interface AuthState { user: User | null; token: string | null; refreshToken: string | null;
  login: (user: User, token: string, refresh: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('fs_user') || 'null'),
  token: localStorage.getItem('fs_token'),
  refreshToken: localStorage.getItem('fs_refresh'),
  login: (user, token, refresh) => {
    localStorage.setItem('fs_user', JSON.stringify(user));
    localStorage.setItem('fs_token', token);
    localStorage.setItem('fs_refresh', refresh);
    set({ user, token, refreshToken: refresh });
  },
  logout: () => {
    localStorage.removeItem('fs_user');
    localStorage.removeItem('fs_token');
    localStorage.removeItem('fs_refresh');
    set({ user: null, token: null, refreshToken: null });
  },
}));
