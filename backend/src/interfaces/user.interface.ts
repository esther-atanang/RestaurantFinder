//This is where you eexport types of responses used within routes so you don't crowd the main route file.

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
}