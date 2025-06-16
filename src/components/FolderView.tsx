import React, { useState } from 'react';
import { ArrowLeft, Upload, Info, Search, Eye, Trash2 } from 'lucide-react';
import { Category } from '../types';
import UploadModal from './UploadModal';
import ExtractionGuidelinesModal from './ExtractionGuidelinesModal';
import FileAnalysisModal from './FileAnalysisModal';
import FilePreviewModal from './FilePreviewModal';
import { Dropdown } from './common/Dropdown/Dropdown';

interface FolderViewProps {
  category: Category;
  onBack: () => void;
}

interface UploadedFile {
  id: string;
  filename: string;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  uploadTime: string;
  uploadedBy: string;
  size: string;
  type: 'PDF' | 'DOCX' | 'HTML' | 'TXT' | 'PPTX' | 'MD';
  extractedData?: {
    toneVoice?: string;
    stylistic?: string;
    structure?: string;
    persona?: string;
    cta?: string;
    keywords?: string[];
    compliance?: string;
    wordCount?: number;
    readingTime?: string;
  };
  analysisTimestamp?: string;
  issues?: string[];
}

const FolderView: React.FC<FolderViewProps> = ({ category, onBack }) => {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'processing' | 'error'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedFileForAnalysis, setSelectedFileForAnalysis] = useState<UploadedFile | null>(null);
  const [selectedFileForPreview, setSelectedFileForPreview] = useState<UploadedFile | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock data for demonstration
  const uploadedFiles: UploadedFile[] = [
    {
      id: '1',
      filename: 'cloud_computing_guide.pdf',
      status: 'completed',
      progress: 100,
      uploadTime: 'Jun 14, 10:35 AM',
      uploadedBy: 'Sarah Chen',
      size: '2.3 MB',
      type: 'PDF',
      analysisTimestamp: '2 minutes ago',
      extractedData: {
        toneVoice: 'Technical, educational',
        stylistic: 'Code examples, diagrams',
        structure: 'Concept→Implementation→Best Practices',
        persona: 'Software developers',
        cta: 'Start free trial',
        keywords: ['cloud', 'AWS', 'Azure', 'infrastructure'],
        compliance: 'No sensitive data detected',
        wordCount: 1847,
        readingTime: '7 min'
      }
    },
    {
      id: '2',
      filename: 'product_launch_announcement.docx',
      status: 'processing',
      progress: 65,
      uploadTime: 'Jun 14, 9:22 AM',
      uploadedBy: 'Mike Rodriguez',
      size: '1.8 MB',
      type: 'DOCX',
      extractedData: {
        wordCount: 1234,
        readingTime: '5 min'
      }
    },
    {
      id: '3',
      filename: 'q2_newsletter.html',
      status: 'error',
      progress: 0,
      uploadTime: 'Jun 13, 4:15 PM',
      uploadedBy: 'Emma Thompson',
      size: '3.1 MB',
      type: 'HTML',
      issues: ['Failed to parse HTML structure', 'Unsupported image format', 'Text extraction incomplete']
    },
    {
      id: '4',
      filename: 'social_media_calendar.md',
      status: 'completed',
      progress: 100,
      uploadTime: 'Jun 12, 2:30 PM',
      uploadedBy: 'Alex Kim',
      size: '856 KB',
      type: 'MD',
      analysisTimestamp: '1 day ago',
      extractedData: {
        toneVoice: 'Engaging, conversational',
        stylistic: 'Hashtags, emojis',
        structure: 'Hook→Content→Call-to-Action',
        persona: 'Social media audience',
        cta: 'Follow us',
        keywords: ['social media', 'content', 'engagement', 'trending'],
        compliance: 'Brand guidelines compliant',
        wordCount: 2156,
        readingTime: '9 min'
      }
    }
  ];

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'completed': return 'Analyzed';
      case 'processing': return 'In Progress';
      case 'error': return 'Failed';
      default: return 'Pending';
    }
  };

  const filteredFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || file.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(f => f.id));
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 px-4 sm:px-6 lg:px-8 pt-6">
          <button onClick={onBack} className="hover:text-gray-700 transition-colors">
            Knowledge Repository
          </button>
          <span className="mx-2">/</span>
          <button onClick={onBack} className="hover:text-gray-700 transition-colors">
            {category.groupName}
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{category.name}</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#111013]" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{category.name}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowGuidelines(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>Guidelines</span>
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 pb-6">
          <div className="relative w-full md:w-auto flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500 hidden md:flex items-center space-x-1">
              <span>4 files</span>
            </div>
            <Dropdown
              options={['All Status', 'Analyzed', 'In Progress', 'Failed']}
              selectedOption={filterStatus === 'all' ? 'All Status' : 
                filterStatus === 'completed' ? 'Analyzed' :
                filterStatus === 'processing' ? 'In Progress' : 'Failed'}
              onSelect={(option) => {
                const statusMap: Record<string, 'all' | 'completed' | 'processing' | 'error'> = {
                  'All Status': 'all',
                  'Analyzed': 'completed',
                  'In Progress': 'processing',
                  'Failed': 'error'
                };
                setFilterStatus(statusMap[option]);
              }}
            />
            <Dropdown
              options={['Sort by Date', 'Sort by Name', 'Sort by Status']}
              selectedOption={
                sortBy === 'date' ? 'Sort by Date' :
                sortBy === 'name' ? 'Sort by Name' : 'Sort by Status'
              }
              onSelect={(option) => {
                const sortMap: Record<string, 'date' | 'name' | 'status'> = {
                  'Sort by Date': 'date',
                  'Sort by Name': 'name',
                  'Sort by Status': 'status'
                };
                setSortBy(sortMap[option]);
              }}
            />
          </div>
        </div>
      </div>

      {/* Table - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white shadow overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full table-fixed">
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 w-12">
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                      onChange={handleSelectAll}
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 w-1/4">Filename</th>
                  <th className="text-left p-4 font-medium text-gray-600 w-1/6">Uploaded By</th>
                  <th className="text-left p-4 font-medium text-gray-600 w-1/6">Uploaded On</th>
                  <th className="text-left p-4 font-medium text-gray-600 w-1/8">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600 w-1/6">Extraction Results</th>
                  <th className="text-left p-4 font-medium text-gray-600 w-1/8">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleFileSelection(file.id)}
                        className="border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-800 truncate">{file.filename}</div>
                        <div className="text-xs text-gray-500 mt-1">{file.size}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 whitespace-nowrap">{file.uploadedBy}</td>
                    <td className="p-4 text-gray-700 whitespace-nowrap">{file.uploadTime}</td>
                    <td className="p-4">
                      <span className="text-gray-700">{getStatusDisplay(file.status)}</span>
                    </td>
                    <td className="p-4">
                      <div className="w-28">
                        {file.status === 'completed' ? (
                          <button
                            onClick={() => setSelectedFileForAnalysis(file)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Results
                          </button>
                        ) : (
                          <button
                            disabled
                            className="text-gray-400 text-sm font-medium cursor-not-allowed"
                          >
                            Not available
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedFileForPreview(file)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to delete this file?"
                            );
                            if (confirmDelete) {
                              console.log("Deleting file:", file.filename);
                            }
                          }}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination and summary */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-500 pb-6">
          <div className="md:hidden">
            📄 4 files
          </div>
          <div></div>
        </div>
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          category={category}
          onClose={() => setShowUploadModal(false)}
          onFilesUploaded={() => {}}
        />
      )}

      {showGuidelines && (
        <ExtractionGuidelinesModal
          category={category}
          onClose={() => setShowGuidelines(false)}
        />
      )}

      {selectedFileForAnalysis && (
        <FileAnalysisModal
          file={selectedFileForAnalysis}
          onClose={() => setSelectedFileForAnalysis(null)}
        />
      )}

      {selectedFileForPreview && (
        <FilePreviewModal
          file={selectedFileForPreview}
          onClose={() => setSelectedFileForPreview(null)}
        />
      )}
    </div>
  );
};

export default FolderView;