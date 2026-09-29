import { AllocationComparisonChartGuide } from '../AllocationComparisonChartGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'allocationcomparisonchart',
  label: 'Allocation Comparison Chart',
  summary: 'Compare category amounts with a supplied reference.',
  keywords: ['bar chart', 'graph', 'portfolio'],
  icon: LEGACY_ICONS.allocationcomparisonchart,
  Component: AllocationComparisonChartGuide,
})
