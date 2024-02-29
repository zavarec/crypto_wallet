import type { AxiosInstance, AxiosResponse } from 'axios';

class AuthService {
  constructor(private readonly api: AxiosInstance) {}

  public logOut(): Promise<AxiosResponse> {
    return this.api('auth/logout');
  }
}

export default new AuthService(axiosInstance);
