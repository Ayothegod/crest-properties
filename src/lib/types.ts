interface User {
  id: number;
  name: string;
  email: string;
}

export interface GetAllUsersResponse {
  data: User[] | null; 
  error: string | null; 
}