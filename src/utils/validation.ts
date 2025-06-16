export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidFileType = (fileName: string, allowedTypes: string[]): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
};

export const isValidFileSize = (fileSize: number, maxSize: number): boolean => {
  return fileSize <= maxSize;
};

export const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[^a-zA-Z0-9-_.]/g, '_');
}; 