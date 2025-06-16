export const APP_NAME = 'Typeface';

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  MAX_FILES: 10
};

export const API_ENDPOINTS = {
  UPLOAD: '/api/upload',
  ANALYZE: '/api/analyze',
  EXTRACT: '/api/extract'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  RECENT_FILES: 'recent_files'
};

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File size exceeds the maximum limit',
  INVALID_FILE_TYPE: 'File type not supported',
  UPLOAD_FAILED: 'Failed to upload file',
  NETWORK_ERROR: 'Network error occurred'
}; 