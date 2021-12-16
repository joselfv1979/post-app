interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  id: string;
  username: string;
  role: string;
  token: string;
}

export { AuthRequest, AuthResponse };
