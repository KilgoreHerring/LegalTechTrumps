import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts'

interface BarDataPoint {
  criterion: string
  score: number
}

interface BarChartProps {
  data: BarDataPoint[]
}

export default function SolutionBarChart({ data }: BarChartProps) {
  if (data.length === 0) {
    return <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No general criteria rated yet.</p>
  }

  const getColor = (score: number) => {
    if (score >= 4) return '#3B82F6'
    if (score >= 3) return '#F59E0B'
    return '#DC2626'
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsBar data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.06)" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 5]}
          tickCount={6}
          tick={{ fill: '#78716C', fontSize: 11 }}
        />
        <YAxis
          type="category"
          dataKey="criterion"
          tick={{ fill: '#44403C', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
          width={120}
        />
        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, i) => (
            <Cell key={i} fill={getColor(entry.score)} />
          ))}
          <LabelList dataKey="score" position="right" style={{ fill: '#1C1917', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }} />
        </Bar>
      </RechartsBar>
    </ResponsiveContainer>
  )
}
