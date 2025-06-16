import React, { useState } from 'react';
import { Bot, Play, Settings, CheckCircle, Clock, RefreshCw, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { agents, trainingRules, contentFolders } from '../../data/agentData';

export const AgentTrainingSystem: React.FC = () => {
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [selectedTrainingType, setSelectedTrainingType] = useState<'folder' | 'global'>('folder');
  const [selectedFolder, setSelectedFolder] = useState('Technical Blogs');
  const [selectedRules, setSelectedRules] = useState<string[]>(
    trainingRules.filter(r => r.included).map(r => r.dimension)
  );
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleTrainAgent = () => {
    setShowTrainingModal(true);
  };

  const handleRuleToggle = (dimension: string) => {
    setSelectedRules(prev => 
      prev.includes(dimension) 
        ? prev.filter(d => d !== dimension)
        : [...prev, dimension]
    );
  };

  const handleStartTraining = () => {
    console.log('Starting training with:', {
      type: selectedTrainingType,
      folder: selectedFolder,
      rules: selectedRules
    });
    setShowTrainingModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'training': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'training': return <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />;
      case 'inactive': return <Clock className="w-4 h-4 text-gray-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const selectedAgentData = agents.find(a => a.id === selectedAgent);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        {/* Training Trigger Panel */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Trained Agents</h2>
          <button
            onClick={handleTrainAgent}
            className="flex items-center space-x-2 h-9 px-4 bg-[#111013] text-white hover:bg-[#2A2A2D] transition-colors rounded-lg"
          >
            <Bot className="w-4 h-4" />
            <span>Train New Agent</span>
          </button>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Agent Dashboard */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                        <p className="text-sm text-gray-500">{agent.version}</p>
                      </div>
                    </div>
                    <span className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-full border ${getStatusColor(agent.status)}`}>
                      {getStatusIcon(agent.status)}
                      <span className="ml-1 capitalize">{agent.status}</span>
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{agent.description}. Specializes in {agent.specialty.toLowerCase()}.</p>

                  {/* Training Details */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Trained On</h4>
                      <div className="flex flex-wrap gap-1">
                        {agent.trainedOn.slice(0, 3).map((folder, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {folder}
                          </span>
                        ))}
                        {agent.trainedOn.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                            +{agent.trainedOn.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Training Date</span>
                        <p className="font-medium text-gray-900">{agent.trainingDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Invocations</span>
                        <p className="font-medium text-gray-900">{agent.usage.invocations.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Extraction Match</span>
                        <p className="font-medium text-gray-900">{agent.accuracy.extractionMatch}%</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Success Rate</span>
                        <p className="font-medium text-gray-900">{agent.usage.successRate}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedAgent(agent.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors text-sm"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 border border-gray-200 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                      <RefreshCw className="w-3 h-3" />
                      <span>Retrain</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 border border-red-200 text-red-700 rounded text-sm hover:bg-red-50 transition-colors">
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Usage Analytics */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage & Feedback Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">15,847</div>
                <div className="text-sm text-gray-500">Total Invocations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">91%</div>
                <div className="text-sm text-gray-500">Average Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">89%</div>
                <div className="text-sm text-gray-500">User Acceptance Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Preview Modal */}
      <Modal
        isOpen={showTrainingModal}
        onClose={() => setShowTrainingModal(false)}
        title="Train New Agent"
        size="lg"
      >
        <div className="p-6 space-y-6">
          {/* Training Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Training Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedTrainingType('folder')}
                className={`p-4 border text-left transition-colors ${
                  selectedTrainingType === 'folder'
                    ? 'border-[#111013] bg-[#FAF7F6]'
                    : 'border-gray-200 hover:border-[#111013]'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Settings className="w-5 h-5 text-[#111013]" />
                  <span className="font-medium text-[#111013]">Train on Folder</span>
                </div>
                <p className="text-sm text-gray-600">Specialize agent for specific content type</p>
              </button>
              <button
                onClick={() => setSelectedTrainingType('global')}
                className={`p-4 border text-left transition-colors ${
                  selectedTrainingType === 'global'
                    ? 'border-[#111013] bg-[#FAF7F6]'
                    : 'border-gray-200 hover:border-[#111013]'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Bot className="w-5 h-5 text-[#111013]" />
                  <span className="font-medium text-[#111013]">Global Brand Agent</span>
                </div>
                <p className="text-sm text-gray-600">Train on entire content repository</p>
              </button>
            </div>
          </div>

          {/* Folder Selection */}
          {selectedTrainingType === 'folder' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Folder</label>
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {contentFolders.map(folder => (
                  <option key={folder} value={folder}>
                    {folder}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Training Rules Preview */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Agent will learn:</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {trainingRules.map((rule) => (
                <label key={rule.dimension} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedRules.includes(rule.dimension)}
                    onChange={() => handleRuleToggle(rule.dimension)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{rule.dimension}</span>
                      <span className="text-xs text-gray-500">({rule.confidence}% confidence)</span>
                    </div>
                    <p className="text-sm text-gray-600">{rule.rule}</p>
                    <div className="mt-2">
                      <details className="text-xs text-gray-500">
                        <summary className="cursor-pointer hover:text-gray-700">View examples</summary>
                        <ul className="mt-1 ml-4 space-y-1">
                          {rule.examples.map((example, index) => (
                            <li key={index}>• {example}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowTrainingModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStartTraining}
              className="flex items-center space-x-2 px-4 py-2 bg-[#FAF7F6] text-[#111013] hover:bg-[#F3F3F4] transition-colors font-medium"
            >
              <Play className="w-4 h-4" />
              <span>Train New Agent</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Agent Details Modal */}
      {selectedAgent && selectedAgentData && (
        <Modal
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
          title={`${selectedAgentData.name} Details`}
          size="lg"
        >
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Training Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="font-medium">{selectedAgentData.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Date:</span>
                    <span className="font-medium">{selectedAgentData.trainingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${selectedAgentData.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {selectedAgentData.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Extraction Match:</span>
                    <span className="font-medium">{selectedAgentData.accuracy.extractionMatch}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User Acceptance:</span>
                    <span className="font-medium">{selectedAgentData.accuracy.userAcceptance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success Rate:</span>
                    <span className="font-medium">{selectedAgentData.usage.successRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Specialty</h4>
              <p className="text-sm text-gray-600">{selectedAgentData.specialty}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Trained Folders</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAgentData.trainedOn.map((folder, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {folder}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-[#FAF7F6] text-[#111013] hover:bg-[#F3F3F4] transition-colors">
                Retrain Agent
              </button>
              <button className="px-4 py-2 bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA] transition-colors">
                Export Configuration
              </button>
              <button className="px-4 py-2 bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA] transition-colors">
                Untrain Agent
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};