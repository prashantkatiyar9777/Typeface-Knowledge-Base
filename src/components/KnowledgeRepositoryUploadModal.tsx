import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Dropdown } from './common/Dropdown/Dropdown';

interface CategoryGroup {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  totalCount: number;
  isExpanded: boolean;
  color: string;
  subTypes: any[];
}

interface KnowledgeRepositoryUploadModalProps {
  categoryGroups: CategoryGroup[];
  onClose: () => void;
}

const KnowledgeRepositoryUploadModal: React.FC<KnowledgeRepositoryUploadModalProps> = ({
  categoryGroups,
  onClose
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedSubType, setSelectedSubType] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

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
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const selectedGroupData = categoryGroups.find(g => g.id === selectedGroup);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Upload to Knowledge Repository</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#111013]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Category Group
              </label>
              <Dropdown
                options={['Choose a category group...', ...categoryGroups.map(group => group.name)]}
                selectedOption={selectedGroup ? categoryGroups.find(g => g.id === selectedGroup)?.name || '' : 'Choose a category group...'}
                onSelect={(option: string) => {
                  if (option === 'Choose a category group...') {
                    setSelectedGroup('');
                  } else {
                    const group = categoryGroups.find(g => g.name === option);
                    if (group) {
                      setSelectedGroup(group.id);
                      setSelectedSubType('');
                    }
                  }
                }}
              />
            </div>

            {selectedGroupData && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Sub-Category
                </label>
                <Dropdown
                  options={['Choose a sub-category...', ...selectedGroupData.subTypes.map(subType => subType.name)]}
                  selectedOption={selectedSubType ? selectedGroupData.subTypes.find(st => st.id === selectedSubType)?.name || '' : 'Choose a sub-category...'}
                  onSelect={(option: string) => {
                    if (option === 'Choose a sub-category...') {
                      setSelectedSubType('');
                    } else {
                      const subType = selectedGroupData.subTypes.find(st => st.name === option);
                      if (subType) {
                        setSelectedSubType(subType.id);
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-[#111013] mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports PDF, DOCX, TXT, MD, HTML, and PPTX files
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt,.md,.html,.pptx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              <span>Choose Files</span>
            </label>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Selected Files</h3>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-[#111013]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-[#111013]" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-[#111013] mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Upload Guidelines</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Files will be analyzed for tone, style, and structure patterns</li>
                  <li>• Maximum file size: 10MB per file</li>
                  <li>• Processing time varies based on file size and complexity</li>
                  <li>• Extracted data will be used to train AI agents for consistent writing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle upload logic here
              console.log('Uploading files:', files);
              onClose();
            }}
            disabled={!selectedGroup || !selectedSubType || files.length === 0}
            className="px-4 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] disabled:bg-[#F3F3F4] disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeRepositoryUploadModal;