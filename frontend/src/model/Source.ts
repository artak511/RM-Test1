export interface SourceModel {
  id?: number;
  name: string;
  ipAddress: string;
  tags: string[];
  credentials: {
    domain: string;
    username: string;
    password: string;
    confirmPassword?: string;
  }
  createdAt?: any;
  updatedAt?: any;
}