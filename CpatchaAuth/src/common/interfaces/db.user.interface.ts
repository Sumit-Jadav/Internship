export interface IDbUser {
  id: number;
  email: string;
  hash_password: string;
  failed_attempts: number;
  is_locked: number;
  reset_link_token: string;
  reset_token_expiry: string;
  password_updated_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
