export type UserRole = 'admin' | 'couple' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  weddingId?: string;
  avatar?: string;
}

export const DEMO_COUPLE_USER: User = {
  id: 'usr-couple-01',
  name: 'Aarav & Meera',
  email: 'aarav.meera@shubhnimantran.in',
  phone: '+91 98201 44520',
  role: 'couple',
  weddingId: 's1ze9iot'
};

export const DEMO_ADMIN_USER: User = {
  id: 'usr-admin-01',
  name: 'Platform Super Admin',
  email: 'admin@shubhnimantran.in',
  role: 'admin'
};
