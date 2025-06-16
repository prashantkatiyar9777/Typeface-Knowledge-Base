export interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  searchProps?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
}

export interface HeaderActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
} 