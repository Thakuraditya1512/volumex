export interface NavItem {
  label: string;
  icon: React.FC<{ size?: number }>;
  id: string;
  sub?: string[];
  badge?: number;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  avatar?: string;
}

export interface StatCard {
  label: string;
  value: string;
  sub: string;
  change: number;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  bg: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  created_at?: string;
}

export interface UserTask {
  id: string;
  user_id: string;
  module_id: number;
  title: string;
  type: 'video' | 'quiz' | 'link' | 'text';
  content_url?: string;
  content_body?: string;
  status: 'locked' | 'available' | 'done';
  completed_at?: string;
  created_at?: string;
}
