import React, { useState } from 'react';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface InteractiveChartProps {
  data: ChartData[];
  type: 'pie' | 'bar';
  onSliceClick?: (slice: ChartData) => void;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  data,
  type,
  onSliceClick
}) => {
  const [selectedSlice, setSelectedSlice] = useState<string | null>(null);

  const handleSliceClick = (slice: ChartData) => {
    setSelectedSlice(slice.label);
    onSliceClick?.(slice);
  };

  if (type === 'pie') {
    return (
      <div className="space-y-4">
        {data.map((slice, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
              selectedSlice === slice.label ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
            }`}
            onClick={() => handleSliceClick(slice)}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${slice.color}`}></div>
              <span className="text-sm text-gray-700">{slice.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{slice.value}%</span>
          </div>
        ))}
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="space-y-3">
      {data.map((bar, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedSlice === bar.label ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
          }`}
          onClick={() => handleSliceClick(bar)}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{bar.label}</span>
            <span className="text-sm text-gray-900">{bar.value}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-[#111013] h-2 rounded-full w-[${(bar.value / maxValue) * 100}%]`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};