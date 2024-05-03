export interface ISessionsRepository {
  authenticateUser(email: string, password: string): Promise<{ token: string }>;
}
