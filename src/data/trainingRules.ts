export interface TrainingRule {
  dimension: string;
  rule: string;
  confidence: number;
  examples: string[];
  included: boolean;
}

export const TRAINING_RULES: TrainingRule[] = [
  {
    dimension: 'Tone & Voice Signals',
    rule: 'Professional tone with trust-building language (45%), conversational elements (25%)',
    confidence: 96,
    examples: [
      'Use "we" pronouns to build partnership',
      'Maintain authoritative yet approachable voice',
      'Avoid overly casual language in professional contexts'
    ],
    included: true
  },
  {
    dimension: 'Stylistic Preferences',
    rule: 'Heavy use of bullet points (40% of content) and customer quotes for credibility',
    confidence: 94,
    examples: [
      'Include 2-3 bullet point sections per piece',
      'Use customer quotes as social proof',
      'Maintain consistent formatting across content types'
    ],
    included: true
  },
  {
    dimension: 'Structural Patterns',
    rule: 'Problem-solution narrative structure (35%), with clear challenge-solution-results flow',
    confidence: 92,
    examples: [
      'Start with problem identification',
      'Present solution with clear benefits',
      'Include measurable results and outcomes'
    ],
    included: true
  },
  {
    dimension: 'Content Strategy Cues',
    rule: 'Educational CTAs preferred ("Learn More", "Get Started") over aggressive sales language',
    confidence: 89,
    examples: [
      'Use "Learn More" for top-funnel content',
      'Include "Get Started" for conversion points',
      'Avoid pushy sales language'
    ],
    included: true
  },
  {
    dimension: 'Persona Targeting Signals',
    rule: 'Primary focus on marketing professionals (35%) with technical depth for developers (28%)',
    confidence: 91,
    examples: [
      'Address marketing challenges and solutions',
      'Include technical implementation details',
      'Balance business and technical perspectives'
    ],
    included: false
  }
];