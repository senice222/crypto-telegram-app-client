import apiService from "./apiService";

class AuthService {
  public async login(userId: string): Promise<string> {
    return apiService
      .post<{ token: string }>(`/auth/login`, { userId })
      .then((res) => res.data.token);
  }
}

const authService = new AuthService();
export default authService;
