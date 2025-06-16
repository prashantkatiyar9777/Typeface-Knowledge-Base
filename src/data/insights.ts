export interface DriftAlert {
  id: string;
  type: 'tone' | 'style' | 'structure' | 'persona';
  severity: 'high' | 'medium' | 'low';
  message: string;
  change: string;
  timeframe: string;
  affectedContent: number;
  trend: 'up' | 'down';
}

export interface ActionRecommendation {
  id: string;
  type: 'style' | 'agent' | 'content' | 'compliance';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  actionItems: string[];
  estimatedTime: string;
  affectedContent: number;
}

export const DRIFT_ALERTS: DriftAlert[] = [
  {
    id: '1',
    type: 'tone',
    severity: 'high',
    message: 'Your recent campaign used Casual tone 4x more than usual',
    change: '+300% increase in casual tone usage',
    timeframe: 'Last 2 weeks',
    affectedContent: 23,
    trend: 'up'
  },
  {
    id: '2',
    type: 'style',
    severity: 'medium',
    message: 'Sales decks are 20% less formal than last quarter',
    change: '-20% formality score decrease',
    timeframe: 'Last quarter',
    affectedContent: 15,
    trend: 'down'
  }
];

export const ACTION_RECOMMENDATIONS: ActionRecommendation[] = [
  {
    id: '1',
    type: 'style',
    priority: 'high',
    title: 'Increase quote usage in blog posts',
    description: 'Blog posts with quotes have 23% higher engagement. Your current usage is below brand average.',
    impact: '+23% engagement increase',
    effort: 'low',
    actionItems: [
      'Add 1-2 customer quotes per blog post',
      'Create quote template library',
      'Train content team on quote integration'
    ],
    estimatedTime: '2 weeks',
    affectedContent: 45
  }
];