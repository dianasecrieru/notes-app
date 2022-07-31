export class LoginResponse {
  constructor(token: string) {
    this.token = token;
  }

  token: string;
}
