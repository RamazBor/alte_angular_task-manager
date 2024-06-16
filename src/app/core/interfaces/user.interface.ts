export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: string[];
  tasks: string[];
}
