import { useState } from 'react';
import { uploadFile } from '../services/api';
import { isValidFileType, isValidFileSize } from '../utils/validation';
import { FILE_UPLOAD, ERROR_MESSAGES } from '../constants/app.constants';

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

interface UploadResult {
  success: boolean;
  url: string;
  error?: string;
}

export const useFileUpload = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null
  });

  const validateFile = (file: File): string | null => {
    if (!isValidFileSize(file.size, FILE_UPLOAD.MAX_SIZE)) {
      return ERROR_MESSAGES.FILE_TOO_LARGE;
    }

    if (!isValidFileType(file.name, FILE_UPLOAD.ALLOWED_TYPES)) {
      return ERROR_MESSAGES.INVALID_FILE_TYPE;
    }

    return null;
  };

  const upload = async (file: File): Promise<UploadResult> => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadState(prev => ({ ...prev, error: validationError }));
      return { success: false, url: '', error: validationError };
    }

    setUploadState({ isUploading: true, progress: 0, error: null });

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 500);

      const response = await uploadFile(file);
      clearInterval(progressInterval);

      if (response.success) {
        setUploadState({
          isUploading: false,
          progress: 100,
          error: null
        });
        return { success: true, url: response.data.url };
      } else {
        throw new Error(response.error || ERROR_MESSAGES.UPLOAD_FAILED);
      }
    } catch (error) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.UPLOAD_FAILED
      });
      return { 
        success: false, 
        url: '', 
        error: error instanceof Error ? error.message : ERROR_MESSAGES.UPLOAD_FAILED 
      };
    }
  };

  return {
    upload,
    ...uploadState
  };
}; 