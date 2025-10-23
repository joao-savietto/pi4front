export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
}

export interface LoginFormProps {
  onLoginSuccess: (data: LoginResponse) => void;
}
