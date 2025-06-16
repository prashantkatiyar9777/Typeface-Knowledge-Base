export interface BrandDimension {
  id: string;
  title: string;
  icon: string;
  color: string;
  data: {
    rule: string;
    dominant?: Array<{ label: string; value: number; color: string }>;
    elements?: Array<{ type: string; frequency: number; per1000: number }>;
    flows?: Array<{ pattern: string; frequency: number }>;
    brandTerms?: Array<{ term: string; count: number }>;
    formality?: { score: number };
    pronouns?: { we: number; you: number; i: number };
    timeline?: Array<{ date: string; value: number }>;
    examples?: Array<{ text: string; score: number; context: string }>;
    styleViolations?: Array<{
      type: string;
      severity: 'critical' | 'mild';
      count: number;
      examples: string[];
    }>;
    performanceMetrics?: {
      ctr: number;
      engagement: number;
      dwellTime: number;
      conversionRate: number;
    };
    passiveVoice?: number;
    sentenceLength?: number;
    readabilityGrade?: string;
    avgSections?: number;
    topCTAs?: Array<{ text: string; count: number }>;
    audienceMatch?: Array<{ persona: string; score: number }>;
  };
}

export const BRAND_DIMENSIONS: BrandDimension[] = [
  {
    id: 'tone-voice',
    title: 'Tone & Voice Signals',
    icon: 'Volume2',
    color: 'bg-[#111013]',
    data: {
      rule: 'Professional tone with trust-building language and moderate directness.',
      dominant: [
        { label: 'Trust-building', value: 45, color: 'bg-blue-500' },
        { label: 'Conversational', value: 25, color: 'bg-green-500' },
        { label: 'Authoritative', value: 20, color: 'bg-purple-500' },
        { label: 'Casual', value: 10, color: 'bg-orange-500' }
      ],
      formality: { score: 0.72 },
      pronouns: { we: 45, you: 35, i: 15 },
      timeline: [
        { date: '2024-01', value: 68 },
        { date: '2024-02', value: 72 },
        { date: '2024-03', value: 75 }
      ],
      audienceMatch: [
        { persona: 'B2B Executives', score: 84 },
        { persona: 'Technical Leaders', score: 76 },
        { persona: 'Product Managers', score: 68 }
      ],
      examples: [
        {
          text: "Our enterprise-grade solution ensures seamless integration with your existing workflow.",
          score: 92,
          context: "Product Description"
        },
        {
          text: "We understand the challenges of scaling your infrastructure securely.",
          score: 88,
          context: "Pain Point Discussion"
        }
      ],
      styleViolations: [
        {
          type: "Informal Language",
          severity: "mild",
          count: 3,
          examples: ["Hey there! Check out this cool feature..."]
        },
        {
          type: "Inconsistent Voice",
          severity: "critical",
          count: 2,
          examples: ["I personally think this is the best approach..."]
        }
      ],
      performanceMetrics: {
        ctr: 4.2,
        engagement: 72,
        dwellTime: 185,
        conversionRate: 3.1
      }
    }
  },
  {
    id: 'stylistic',
    title: 'Stylistic Preferences',
    icon: 'Palette',
    color: 'bg-[#111013]',
    data: {
      rule: 'Long-form sentences with consistent bulleting and light use of emojis.',
      elements: [
        { type: 'Simple Sentences', frequency: 40, per1000: 12 },
        { type: 'Compound Sentences', frequency: 35, per1000: 8 },
        { type: 'Complex Sentences', frequency: 25, per1000: 5 }
      ],
      timeline: [
        { date: '2024-01', value: 82 },
        { date: '2024-02', value: 85 },
        { date: '2024-03', value: 88 }
      ],
      examples: [
        {
          text: "• Key benefits:\n- Improved efficiency\n- Reduced costs\n- Better outcomes",
          score: 95,
          context: "Feature List"
        },
        {
          text: "1. First, configure your settings\n2. Then, connect your data source\n3. Finally, start the analysis",
          score: 92,
          context: "Instructions"
        }
      ],
      styleViolations: [
        {
          type: "Inconsistent Formatting",
          severity: "mild",
          count: 4,
          examples: ["Mixed bullet styles in the same list"]
        },
        {
          type: "Emoji Overuse",
          severity: "mild",
          count: 2,
          examples: ["✨🚀 Amazing new features! 🎉💪"]
        }
      ],
      performanceMetrics: {
        ctr: 3.8,
        engagement: 68,
        dwellTime: 165,
        conversionRate: 2.8
      }
    }
  },
  {
    id: 'structural',
    title: 'Structural Patterns',
    icon: 'Layers',
    color: 'bg-[#111013]',
    data: {
      rule: 'Opens with problem statement, closes with action prompt.',
      flows: [
        { pattern: 'Problem→Solution→Results', frequency: 55 },
        { pattern: 'Story→Lesson→Action', frequency: 25 },
        { pattern: 'Context→Feature→Benefit', frequency: 20 }
      ],
      avgSections: 5.2,
      timeline: [
        { date: '2024-01', value: 78 },
        { date: '2024-02', value: 82 },
        { date: '2024-03', value: 85 }
      ],
      examples: [
        {
          text: "Challenge: Managing large-scale data pipelines\nSolution: Our automated workflow\nResult: 50% faster processing",
          score: 94,
          context: "Case Study"
        },
        {
          text: "Problem: Manual deployment errors\nSolution: Automated CI/CD\nOutcome: 99.9% success rate",
          score: 91,
          context: "Technical Blog"
        }
      ],
      styleViolations: [
        {
          type: "Missing Call-to-Action",
          severity: "critical",
          count: 3,
          examples: ["Blog post ends without clear next steps"]
        }
      ],
      performanceMetrics: {
        ctr: 4.5,
        engagement: 75,
        dwellTime: 210,
        conversionRate: 3.4
      }
    }
  },
  {
    id: 'linguistic',
    title: 'Linguistic Features',
    icon: 'MessageSquare',
    color: 'bg-[#111013]',
    data: {
      rule: 'Active verbs and minimal hedging; reading level Grade 9.',
      sentenceLength: 18.5,
      readabilityGrade: '9.2',
      passiveVoice: 12,
      timeline: [
        { date: '2024-01', value: 88 },
        { date: '2024-02', value: 90 },
        { date: '2024-03', value: 91 }
      ],
      examples: [
        {
          text: "The system automatically processes your data and generates insights.",
          score: 96,
          context: "Feature Description"
        },
        {
          text: "Users can customize dashboards with drag-and-drop widgets.",
          score: 94,
          context: "UI Description"
        }
      ],
      styleViolations: [
        {
          type: "Passive Voice Overuse",
          severity: "mild",
          count: 5,
          examples: ["The data was processed by the system"]
        },
        {
          type: "Complex Jargon",
          severity: "mild",
          count: 3,
          examples: ["Utilizing the methodological framework..."]
        }
      ],
      performanceMetrics: {
        ctr: 3.9,
        engagement: 70,
        dwellTime: 195,
        conversionRate: 2.9
      }
    }
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy Cues',
    icon: 'Target',
    color: 'bg-[#111013]',
    data: {
      rule: 'SEO-focused, education-first content with brand mentions in last paragraph.',
      topCTAs: [
        { text: 'Learn More', count: 156 },
        { text: 'Get Started', count: 134 },
        { text: 'Contact Us', count: 98 },
        { text: 'Schedule Demo', count: 87 }
      ],
      performanceMetrics: {
        ctr: 3.2,
        engagement: 65,
        dwellTime: 245,
        conversionRate: 2.8
      },
      timeline: [
        { date: '2024-01', value: 82 },
        { date: '2024-02', value: 85 },
        { date: '2024-03', value: 88 }
      ],
      examples: [
        {
          text: "Discover how leading enterprises are transforming their operations with AI-powered analytics.",
          score: 93,
          context: "Blog Introduction"
        },
        {
          text: "Ready to revolutionize your data strategy? Schedule a demo today.",
          score: 89,
          context: "Call-to-Action"
        }
      ],
      styleViolations: [
        {
          type: "Keyword Stuffing",
          severity: "critical",
          count: 2,
          examples: ["AI machine learning AI algorithms AI solutions..."]
        }
      ]
    }
  },
  {
    id: 'domain-specific',
    title: 'Domain‑Specific Rules',
    icon: 'Code',
    color: 'bg-[#111013]',
    data: {
      rule: 'Technical accuracy with practical implementation examples.',
      brandTerms: [
        { term: 'AI-powered analytics', count: 45 },
        { term: 'real-time processing', count: 38 },
        { term: 'enterprise-grade', count: 32 },
        { term: 'scalable solution', count: 28 }
      ],
      timeline: [
        { date: '2024-01', value: 85 },
        { date: '2024-02', value: 88 },
        { date: '2024-03', value: 92 }
      ],
      examples: [
        {
          text: "Our distributed processing engine handles 1M+ events per second with sub-millisecond latency.",
          score: 96,
          context: "Performance Specs"
        }
      ],
      styleViolations: [
        {
          type: "Unverified Claims",
          severity: "critical",
          count: 2,
          examples: ["Fastest solution in the market"]
        }
      ],
      performanceMetrics: {
        ctr: 4.1,
        engagement: 73,
        dwellTime: 205,
        conversionRate: 3.2
      }
    }
  }
];