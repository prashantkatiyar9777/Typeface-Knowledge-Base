import { API_ENDPOINTS } from '../constants/app.constants';
import { AnalysisResult, ExtractionOptions, ExtractionResult } from '../types/api.types';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export const uploadFile = async (file: File): Promise<ApiResponse<{ url: string }>> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(API_ENDPOINTS.UPLOAD, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return {
      data: { url: '' },
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

export const analyzeFile = async (fileUrl: string): Promise<ApiResponse<AnalysisResult>> => {
  try {
    const response = await fetch(API_ENDPOINTS.ANALYZE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fileUrl })
    });
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return {
      data: {
        content: '',
        metadata: {
          fileType: '',
          fileSize: 0,
          createdAt: '',
          modifiedAt: ''
        },
        insights: {
          topics: [],
          sentiment: 0,
          keywords: [],
          summary: ''
        }
      },
      success: false,
      error: error instanceof Error ? error.message : 'Analysis failed'
    };
  }
};

export const extractContent = async (
  fileUrl: string, 
  options: ExtractionOptions
): Promise<ApiResponse<ExtractionResult>> => {
  try {
    const response = await fetch(API_ENDPOINTS.EXTRACT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fileUrl, options })
    });
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return {
      data: {
        content: '',
        metadata: {
          title: '',
          author: '',
          date: '',
          pages: 0
        },
        images: []
      },
      success: false,
      error: error instanceof Error ? error.message : 'Extraction failed'
    };
  }
}; 