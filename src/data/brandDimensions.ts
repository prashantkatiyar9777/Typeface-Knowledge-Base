export interface BrandDimension {
  id: string;
  title: string;
  icon: string;
  color: string;
  data: any;
}

export const BRAND_DIMENSIONS: BrandDimension[] = [
  {
    id: 'tone-voice',
    title: 'Tone & Voice Signals',
    icon: 'Volume2',
    color: 'bg-[#111013]',
    data: {
      dominant: [
        { label: 'Trust-building', value: 45, color: 'bg-[#111013]' },
        { label: 'Conversational', value: 25, color: 'bg-[#111013]' },
        { label: 'Authoritative', value: 20, color: 'bg-[#111013]' },
        { label: 'Casual', value: 10, color: 'bg-[#111013]' }
      ],
      formality: { score: 0.72, trend: 'up' },
      pronouns: { we: 45, you: 35, i: 15, they: 5 },
      rule: 'Professional tone with trust-building language dominates across content types'
    }
  },
  {
    id: 'stylistic',
    title: 'Stylistic Preferences',
    icon: 'Palette',
    color: 'bg-[#111013]',
    data: {
      elements: [
        { type: 'Bullets', frequency: 40, per1000: 12 },
        { type: 'Quotes', frequency: 35, per1000: 8 },
        { type: 'Tables', frequency: 15, per1000: 3 },
        { type: 'Code blocks', frequency: 10, per1000: 2 }
      ],
      rule: 'Heavy use of bullet points and customer quotes for credibility'
    }
  },
  {
    id: 'structural',
    title: 'Structural Patterns',
    icon: 'Layers',
    color: 'bg-[#111013]',
    data: {
      flows: [
        { pattern: 'Challenge→Solution→Results', frequency: 35 },
        { pattern: 'Problem→Analysis→Implementation', frequency: 28 },
        { pattern: 'Introduction→Features→Benefits', frequency: 22 },
        { pattern: 'Story→Lesson→Application', frequency: 15 }
      ],
      avgSections: 5.2,
      rule: 'Problem-solution narrative structure preferred across content types'
    }
  },
  {
    id: 'linguistic',
    title: 'Linguistic Features',
    icon: 'MessageSquare',
    color: 'bg-[#111013]',
    data: {
      sentenceLength: 18.5,
      jargonDensity: 0.15,
      readabilityGrade: 8.2,
      passiveVoice: 12,
      rule: 'Moderate sentence length with controlled technical jargon usage'
    }
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy Cues',
    icon: 'Target',
    color: 'bg-[#111013]',
    data: {
      topCTAs: [
        { text: 'Learn More', count: 156 },
        { text: 'Get Started', count: 134 },
        { text: 'Contact Us', count: 98 },
        { text: 'Schedule Demo', count: 87 }
      ],
      internalLinkRate: 0.23,
      rule: 'Educational CTAs preferred over aggressive sales language'
    }
  },
  {
    id: 'domain-specific',
    title: 'Domain‑Specific Rules',
    icon: 'Code',
    color: 'bg-[#111013]',
    data: {
      brandTerms: [
        { term: 'digital transformation', count: 89 },
        { term: 'customer experience', count: 76 },
        { term: 'data-driven', count: 65 },
        { term: 'scalable solution', count: 54 }
      ],
      complianceRate: 0.94,
      rule: 'Consistent use of transformation and experience terminology'
    }
  },
  {
    id: 'behavioral',
    title: 'Behavioral/Performance Metadata',
    icon: 'BarChart3',
    color: 'bg-[#111013]',
    data: {
      avgScrollDepth: 0.68,
      readThroughRate: 0.45,
      ctaEngagementRate: 0.12,
      shareRate: 0.08,
      rule: 'Content optimized for 68% scroll depth with moderate engagement'
    }
  },
  {
    id: 'persona-signals',
    title: 'Persona Targeting Signals',
    icon: 'Users',
    color: 'bg-[#111013]',
    data: {
      mentions: [
        { role: 'Marketing Managers', frequency: 35 },
        { role: 'Developers', frequency: 28 },
        { role: 'Executives', frequency: 22 },
        { role: 'Sales Teams', frequency: 15 }
      ],
      rule: 'Primary focus on marketing professionals with technical depth'
    }
  },
  {
    id: 'emotional',
    title: 'Emotional Framing & Sentiment',
    icon: 'MessageSquare',
    color: 'bg-[#111013]',
    data: {
      emotions: [
        { type: 'Empowerment', mix: 40 },
        { type: 'Urgency', mix: 25 },
        { type: 'Empathy', mix: 20 },
        { type: 'Excitement', mix: 15 }
      ],
      sentimentScore: 0.72,
      rule: 'Empowering tone with controlled urgency and empathetic understanding'
    }
  },
  {
    id: 'media-assets',
    title: 'Media Asset References',
    icon: 'FileText',
    color: 'bg-[#111013]',
    data: {
      formats: [
        { type: 'Screenshots', percentage: 45 },
        { type: 'Infographics', percentage: 25 },
        { type: 'Videos', percentage: 20 },
        { type: 'None', percentage: 10 }
      ],
      rule: 'Heavy reliance on screenshots and visual proof points'
    }
  },
  {
    id: 'localization',
    title: 'Localization Patterns',
    icon: 'Globe',
    color: 'bg-[#111013]',
    data: {
      coverage: [
        { language: 'English (US)', percentage: 85 },
        { language: 'English (UK)', percentage: 10 },
        { language: 'Spanish', percentage: 3 },
        { language: 'French', percentage: 2 }
      ],
      rule: 'Primarily US English with minimal international adaptation'
    }
  },
  {
    id: 'tagging',
    title: 'Tagging Taxonomies',
    icon: 'Tag',
    color: 'bg-[#111013]',
    data: {
      topTags: [
        { tag: 'Product Update', count: 234 },
        { tag: 'Case Study', count: 189 },
        { tag: 'Best Practices', count: 156 },
        { tag: 'Industry Insights', count: 134 }
      ],
      rule: 'Product-focused tagging with emphasis on practical guidance'
    }
  },
  {
    id: 'repetition',
    title: 'Common Repetition Patterns',
    icon: 'RefreshCw',
    color: 'bg-[#111013]',
    data: {
      phrases: [
        { phrase: 'In today\'s digital landscape', count: 45 },
        { phrase: 'Our team of experts', count: 38 },
        { phrase: 'Proven track record', count: 32 },
        { phrase: 'Industry-leading solution', count: 28 }
      ],
      rule: 'Consistent use of authority-building phrases and industry context'
    }
  },
  {
    id: 'style-violations',
    title: 'Style Violations to Avoid',
    icon: 'AlertCircle',
    color: 'bg-[#111013]',
    data: {
      violations: [
        { type: 'Clickbait headlines', percentage: 8 },
        { type: 'Missing disclaimers', percentage: 5 },
        { type: 'Inconsistent formatting', percentage: 12 },
        { type: 'Overuse of superlatives', percentage: 15 }
      ],
      rule: 'Avoid clickbait and excessive superlatives; maintain professional credibility'
    }
  },
  {
    id: 'compliance',
    title: 'Compliance/Legal Patterns',
    icon: 'CheckCircle',
    color: 'bg-[#111013]',
    data: {
      coverage: [
        { type: 'Legal disclaimers', percentage: 94 },
        { type: 'Copyright notices', percentage: 87 },
        { type: 'Trademark usage', percentage: 91 },
        { type: 'Privacy statements', percentage: 89 }
      ],
      rule: 'High compliance rate with legal requirements and proper attribution'
    }
  }
];