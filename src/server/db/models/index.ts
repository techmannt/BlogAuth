export interface TUsers {
  id: number;
  email: string;
  password: string;
  role: string;
  created_at: Date;
}

export interface TTokens {
  id: number;
  userid: number;
  token_val: string;
  created_at: Date;
}
