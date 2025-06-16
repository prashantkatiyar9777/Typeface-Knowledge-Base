import React, { useState } from 'react';
import { Lightbulb, CheckCircle, TrendingUp, ArrowRight, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { ACTION_RECOMMENDATIONS } from '../../data/insights';
import { getSeverityColor } from '../../utils/helpers';

export const ActionRecommendations: React.FC = () => {
  const [dismissedRecommendations, setDismissedRecommendations] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const dismissRecommendation = (id: string) => {
    setDismissedRecommendations(prev => [...prev, id]);
  };

  const filteredRecommendations = ACTION_RECOMMENDATIONS.filter(rec => 
    !dismissedRecommendations.includes(rec.id) &&
    (selectedPriority === 'all' || rec.priority === selectedPriority)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Action Recommendations</h3>
              <p className="text-sm text-gray-500">AI-powered suggestions to improve brand consistency</p>
            </div>
          </div>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as any)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredRecommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 capitalize">{rec.type}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{rec.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <div>
                        <div className="text-xs text-gray-500">Impact</div>
                        <div className="text-sm font-medium text-gray-900">{rec.impact}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div>
                        <div className="text-xs text-gray-500">Timeline</div>
                        <div className="text-sm font-medium text-gray-900">{rec.estimatedTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div>
                        <div className="text-xs text-gray-500">Affected</div>
                        <div className="text-sm font-medium text-gray-900">{rec.affectedContent} items</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Action Items:</h5>
                    <ul className="space-y-1">
                      {rec.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => dismissRecommendation(rec.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors text-sm font-medium">
                    Start Implementation
                  </button>
                  <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Learn More
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>View details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h4>
            <p className="text-gray-500">No recommendations at this time. Your brand consistency is looking great.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};