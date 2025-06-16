import { 
  Volume2, Palette, Layers, MessageSquare, Target, Code, BarChart3, 
  Users, FileText, Globe, Tag, RefreshCw, AlertCircle, CheckCircle,
  Edit3, Mail, Zap, Star, TrendingUp, Camera, Video, Search, Monitor,
  Calendar, PenTool, Headphones, Settings, FileImage, Briefcase,
  Plus, Eye, Filter, Download, Upload, ArrowLeft, ArrowRight,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Save,
  Clock, Folder, Database, Brain, Crown, Home, Image
} from 'lucide-react';

export const iconMap = {
  Volume2, Palette, Layers, MessageSquare, Target, Code, BarChart3,
  Users, FileText, Globe, Tag, RefreshCw, AlertCircle, CheckCircle,
  Edit3, Mail, Zap, Star, TrendingUp, Camera, Video, Search, Monitor,
  Calendar, PenTool, Headphones, Settings, FileImage, Briefcase,
  Plus, Eye, Filter, Download, Upload, ArrowLeft, ArrowRight,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Save,
  Clock, Folder, Database, Brain, Crown, Home, Image
};

export const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap];
};