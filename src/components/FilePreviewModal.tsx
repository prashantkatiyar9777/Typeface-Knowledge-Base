import React, { useState } from 'react';
import { X, FileText, Download, Eye, ZoomIn, ZoomOut } from 'lucide-react';

interface FilePreviewModalProps {
  file: {
    id: string;
    filename: string;
    status: string;
    uploadedBy: string;
    uploadTime: string;
    size: string;
    type: string;
  };
  onClose: () => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose }) => {
  const [zoom, setZoom] = useState(100);

  // Mock content for demonstration
  const mockContent = `# ${file.filename.replace(/\.[^/.]+$/, "").replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

## Executive Summary

This document outlines our comprehensive approach to digital transformation, focusing on customer experience enhancement and operational efficiency improvements.

### Key Highlights

- **ROI Improvement**: 45% increase in operational efficiency
- **Customer Satisfaction**: 92% positive feedback rating  
- **Implementation Timeline**: 6-month phased rollout
- **Cost Savings**: $2.3M annually in operational costs

## Challenge

Our client faced significant challenges in their legacy systems:

• Outdated infrastructure limiting scalability
• Disconnected customer touchpoints
• Manual processes causing delays
• Limited data visibility across departments

## Solution Approach

We implemented a three-phase transformation strategy:

### Phase 1: Infrastructure Modernization
- Cloud migration of core systems
- API-first architecture implementation
- Security framework enhancement

### Phase 2: Customer Experience Optimization
- Unified customer portal development
- Mobile-first responsive design
- Real-time support integration

### Phase 3: Data & Analytics
- Business intelligence dashboard
- Predictive analytics implementation
- Automated reporting systems

## Results & Impact

The transformation delivered measurable results:

> "The new system has revolutionized how we serve our customers. Response times have improved by 60%, and our team can focus on strategic initiatives rather than manual tasks." - Sarah Johnson, VP of Operations

### Quantified Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Response Time | 24 hours | 4 hours | 83% faster |
| Customer Satisfaction | 67% | 92% | +25 points |
| Processing Efficiency | 45% | 89% | +44 points |
| Cost per Transaction | $12.50 | $7.80 | 38% reduction |

## Next Steps

To maintain momentum and continue improving:

1. **Continuous Monitoring**: Implement ongoing performance tracking
2. **User Training**: Expand training programs for all stakeholders  
3. **Feature Enhancement**: Regular updates based on user feedback
4. **Scalability Planning**: Prepare for future growth requirements

---

*For more information about our digital transformation services, contact our team to schedule a consultation.*`;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleDownload = () => {
    // Mock download functionality
    console.log('Downloading file:', file.filename);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{file.filename}</h2>
              <p className="text-sm text-gray-500">
                {file.size} • Uploaded by {file.uploadedBy} • {file.uploadTime}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                disabled={zoom <= 50}
              >
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-2 text-sm text-gray-600 min-w-[3rem] text-center">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                disabled={zoom >= 200}
              >
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div 
            className="bg-white rounded-lg shadow-sm p-8 mx-auto max-w-4xl"
          >
            <div className={`text-[${zoom}%]`}>
              <div className="prose prose-gray max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                  {mockContent}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Type: {file.type}</span>
            <span>•</span>
            <span>Status: {file.status}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;