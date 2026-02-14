import { RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts'

interface RadarDataPoint {
  area: string
  score: number
  fullMark: number
  scoreB?: number
}

interface RadarChartProps {
  data: RadarDataPoint[]
  labelA?: string
  labelB?: string
  showSecondSeries?: boolean
}

export default function SolutionRadarChart({ data, labelA = 'Score', labelB, showSecondSeries = false }: RadarChartProps) {
  if (data.length < 3) {
    return <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Need at least 3 evaluation areas for radar chart.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="rgba(0, 0, 0, 0.08)" />
        <PolarAngleAxis
          dataKey="area"
          tick={{ fill: '#44403C', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
        />
        <PolarRadiusAxis
          domain={[0, 5]}
          tickCount={6}
          tick={{ fill: '#78716C', fontSize: 10 }}
        />
        <Radar
          name={labelA}
          dataKey="score"
          stroke="#3B82F6"
          fill="#3B82F6"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        {showSecondSeries && (
          <Radar
            name={labelB ?? 'Solution B'}
            dataKey="scoreB"
            stroke="#94A3B8"
            fill="#94A3B8"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        )}
        {showSecondSeries && <Legend wrapperStyle={{ fontSize: 12, color: '#44403C' }} />}
      </RechartsRadar>
    </ResponsiveContainer>
  )
}
