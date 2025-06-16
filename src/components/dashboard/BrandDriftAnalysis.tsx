import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { DRIFT_ALERTS } from '../../data/insights';
import { getSeverityColor } from '../../utils/helpers';
import { Dropdown } from '../common/Dropdown/Dropdown';

export const BrandDriftAnalysis: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const timeframeOptions = [
    'Last 7 days',
    'Last 30 days',
    'Last 90 days'
  ];

  const severityOptions = [
    'All Severity',
    'High',
    'Medium',
    'Low'
  ];

  const timeframeMap: Record<string, string> = {
    'Last 7 days': '7d',
    'Last 30 days': '30d',
    'Last 90 days': '90d'
  };

  const severityMap: Record<string, string> = {
    'All Severity': 'all',
    'High': 'high',
    'Medium': 'medium',
    'Low': 'low'
  };

  const filteredAlerts = DRIFT_ALERTS.filter(alert => 
    selectedSeverity === 'all' || alert.severity === selectedSeverity
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Brand Drift Detector</h3>
              <p className="text-sm text-gray-500">Identify deviations from established brand patterns</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Dropdown
              options={timeframeOptions}
              selectedOption={Object.entries(timeframeMap).find(([_, value]) => value === selectedTimeframe)?.[0] || timeframeOptions[0]}
              onSelect={(option: string) => setSelectedTimeframe(timeframeMap[option])}
            />
            <Dropdown
              options={severityOptions}
              selectedOption={Object.entries(severityMap).find(([_, value]) => value === selectedSeverity)?.[0] || severityOptions[0]}
              onSelect={(option: string) => setSelectedSeverity(severityMap[option])}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">{alert.timeframe}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{alert.message}</h4>
                  <p className="text-sm text-gray-600 mb-2">{alert.change}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{alert.affectedContent} pieces of content affected</span>
                    <div className="flex items-center space-x-1">
                      {alert.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-red-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-green-500" />
                      )}
                      <span>Trending {alert.trend}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1 text-xs bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA] transition-colors">
                    Investigate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};