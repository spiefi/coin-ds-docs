import { AreaLineChartGuide } from '../AreaLineChartGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'arealinechart',
  label: 'Area Line Chart',
  summary: 'Show a continuous trend and make series comparison legible.',
  keywords: ['line chart', 'area chart', 'graph', 'trend', 'time series'],
  icon: LEGACY_ICONS.arealinechart,
  Component: AreaLineChartGuide,
})
