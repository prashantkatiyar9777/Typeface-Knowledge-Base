import React, { useState } from 'react';
import { X, Upload, FileText, Loader, CheckCircle, AlertCircle, Cloud, Database, Mail } from 'lucide-react';
import { Category } from '../types';

interface UploadModalProps {
  category: Category;
  onClose: () => void;
  onFilesUploaded: (files: { file: File; status: 'pending' | 'uploading' | 'processing' | 'completed'; progress: number }[]) => void;
}

interface UploadFile {
  file: File;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

const UploadModal: React.FC<UploadModalProps> = ({ category, onClose, onFilesUploaded }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'connect'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const newUploadFiles = files.map(file => ({
        file,
        status: 'pending' as const,
        progress: 0
      }));
      setUploadFiles(prev => [...prev, ...newUploadFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newUploadFiles = files.map(file => ({
        file,
        status: 'pending' as const,
        progress: 0
      }));
      setUploadFiles(prev => [...prev, ...newUploadFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateUpload = async (fileIndex: number) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadFiles(prev => prev.map((file, i) => 
        i === fileIndex ? { ...file, progress, status: progress === 100 ? 'processing' : 'uploading' } : file
      ));
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploadFiles(prev => prev.map((file, i) => 
      i === fileIndex ? { ...file, status: 'completed' } : file
    ));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    
    const uploadPromises = uploadFiles.map((_, index) => simulateUpload(index));
    
    try {
      await Promise.all(uploadPromises);
      onFilesUploaded(uploadFiles);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader className="w-3 h-3 text-[#111013] animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-[#111013]" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-[#111013]" />;
      default:
        return <FileText className="w-3 h-3 text-[#111013]" />;
    }
  };

  const getStatusText = (status: UploadFile['status']) => {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'processing': return 'Processing...';
      case 'completed': return 'Completed';
      case 'error': return 'Error';
      default: return 'Ready';
    }
  };

  const connectSources = [
    { name: 'Google Drive', icon: Cloud, description: 'Sync documents and folders', priority: 'high' },
    { name: 'Notion', icon: Database, description: 'Import pages and databases', priority: 'high' },
    { name: 'SharePoint', icon: Cloud, description: 'Connect to SharePoint sites', priority: 'medium' },
    { name: 'HubSpot', icon: Database, description: 'Import marketing content', priority: 'medium' },
    { name: 'Salesforce', icon: Database, description: 'Sync sales materials', priority: 'low' },
    { name: 'Email', icon: Mail, description: 'Import email campaigns', priority: 'low' }
  ];

  const prioritySources = connectSources.filter(s => s.priority === 'high');
  const otherSources = connectSources.filter(s => s.priority !== 'high');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add Content to {category.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Upload files or connect external sources</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-[#111013]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'text-[#111013] border-b-2 border-[#111013] bg-[#FAF7F6]'
                : 'text-gray-500 hover:text-[#111013]'
            }`}
          >
            Upload Files
          </button>
          <button
            onClick={() => setActiveTab('connect')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'connect'
                ? 'text-[#111013] border-b-2 border-[#111013] bg-[#FAF7F6]'
                : 'text-gray-500 hover:text-[#111013]'
            }`}
          >
            Connect Sources
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'upload' ? (
            <div className="space-y-6">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="w-12 h-12 bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-[#111013]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to browse
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Supports PDF, DOCX, PPTX, TXT, MD files up to 10MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.pptx,.txt,.md"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] cursor-pointer transition-colors font-medium"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  <span>Choose Files</span>
                </label>
              </div>

              {/* Selected Files */}
              {uploadFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Files to Upload:</h4>
                  {uploadFiles.map((uploadFile, index) => (
                    <div key={index} className="border border-gray-200 p-4 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(uploadFile.status)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{uploadFile.file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB • {getStatusText(uploadFile.status)}
                            </p>
                          </div>
                        </div>
                        {uploadFile.status === 'pending' && (
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 hover:bg-gray-200 transition-colors"
                          >
                            <X className="w-3 h-3 text-[#111013]" />
                          </button>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {(uploadFile.status === 'uploading' || uploadFile.status === 'processing') && (
                        <div className="mb-3">
                          <div className={`bg-[#111013] h-2 rounded-full w-[${uploadFile.progress}%]`}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Processing Info */}
              <div className="bg-blue-50 p-4 border border-blue-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Extraction Recipe: {category.name}
                </h4>
                <p className="text-xs text-gray-600 mb-3">
                  Files will be processed using the {category.name} extraction recipe:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Semantic chunking by content structure</li>
                  <li>• AI-powered metadata extraction (tone, style, terminology)</li>
                  <li>• Vector embedding generation for similarity search</li>
                  <li>• Style pattern analysis and profiling</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-gray-600">
                Connect external sources to automatically sync and process your content.
              </p>
              
              {/* Priority Sources */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Fast-Track Integrations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prioritySources.map((source) => (
                    <button
                      key={source.name}
                      className="flex items-start space-x-3 p-4 border-2 border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100 transition-colors text-left"
                    >
                      <source.icon className="w-5 h-5 text-[#111013] mt-1" />
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">{source.name}</h5>
                        <p className="text-xs text-gray-600">{source.description}</p>
                        <p className="text-xs text-blue-600 font-medium mt-1">Coming Soon</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Other Sources */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Other Integrations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {otherSources.map((source) => (
                    <button
                      key={source.name}
                      className="flex items-start space-x-3 p-4 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
                    >
                      <source.icon className="w-5 h-5 text-[#111013] mt-1" />
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">{source.name}</h5>
                        <p className="text-xs text-gray-500">{source.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 p-4 border border-yellow-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Mode</h4>
                <p className="text-xs text-gray-600 mb-3">
                  Try our demo connection to see how source integration works.
                </p>
                <button className="px-3 py-2 bg-yellow-600 text-white hover:bg-yellow-700 transition-colors">
                  Simulate Google Drive Connection
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA] transition-colors"
          >
            Cancel
          </button>
          {activeTab === 'upload' && uploadFiles.length > 0 && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="flex items-center space-x-2 px-6 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isUploading ? (
                <>
                  <Loader className="w-3 h-3 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3 h-3" />
                  <span>Start Ingestion ({uploadFiles.length} files)</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;