import { 
  Home, 
  Folder, 
  Image, 
  Users, 
  FileText, 
  Crown, 
  UserCheck, 
  Brain, 
  Database,
  Settings,
  Search,
  Upload,
  Download,
  X,
  ChevronDown,
  MessageSquare,
  Eye,
  Info,
  ArrowLeft
} from 'lucide-react';

const iconMap = {
  home: Home,
  folder: Folder,
  image: Image,
  users: Users,
  fileText: FileText,
  crown: Crown,
  userCheck: UserCheck,
  brain: Brain,
  database: Database,
  settings: Settings,
  search: Search,
  upload: Upload,
  download: Download,
  close: X,
  chevronDown: ChevronDown,
  messageSquare: MessageSquare,
  eye: Eye,
  info: Info,
  arrowLeft: ArrowLeft
};

export const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || null;
}; 