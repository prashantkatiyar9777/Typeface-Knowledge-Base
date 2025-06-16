export const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '↗️';
    case 'down': return '↘️';
    default: return '➡️';
  }
};

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-700 border-green-200';
    case 'training': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'success': return 'text-green-700 bg-green-50 border-green-200';
    case 'warning': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    case 'error': return 'text-red-700 bg-red-50 border-red-200';
    default: return 'text-gray-700 bg-gray-50 border-gray-200';
  }
};

export const formatFileSize = (bytes: number): string => {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

export const formatTimeAgo = (date: string): string => {
  // Simple time ago formatting
  return date;
};