export const RESEARCH_CATEGORIES = [
  'Economic Policy',
  'Foreign Relations',
  'Climate Change',
  'Healthcare',
  'Education',
  'Technology'
] as const

export type ResearchCategory = typeof RESEARCH_CATEGORIES[number] 