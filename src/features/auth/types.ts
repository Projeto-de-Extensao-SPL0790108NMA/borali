/**
 * User model
 */
export interface User {
  id: string;
  nome: string;
  email: string;
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  senha: string;
}

/**
 * Login response data
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * Register request payload
 */
export interface RegisterRequest {
  nome: string;
  idade: number;
  telefone: string;
  cep: string;
  email: string;
  repetirSenha: string;
  senha: string;
}

/**
 * Auth state managed by Zustand
 */
export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}
