'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { FIELD_HEALTH_STYLES, type FieldHealthStatus } from '@/lib/field-status'

const DOT_HEX: Record<FieldHealthStatus, string> = {
  healthy: '#22c55e',
  monitor: '#f59e0b',
  needs_attention: '#ef4444',
  critical: '#b91c1c',
}

export function HealthDonut({ counts }: { counts: Record<FieldHealthStatus, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  const healthyPct = total > 0 ? Math.round((counts.healthy / total) * 100) : 0

  const data = (Object.keys(counts) as FieldHealthStatus[])
    .filter((k) => counts[k] > 0)
    .map((k) => ({ name: FIELD_HEALTH_STYLES[k].label, value: counts[k], key: k }))

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-36 h-36 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data.length ? data : [{ name: 'None', value: 1, key: 'healthy' }]} dataKey="value" innerRadius={48} outerRadius={68} startAngle={90} endAngle={-270}>
              {(data.length ? data : [{ key: 'healthy' as FieldHealthStatus }]).map((entry, i) => (
                <Cell key={i} fill={DOT_HEX[entry.key]} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#0D1B2A]">{healthyPct}%</span>
          <span className="text-xs text-slate-500">Healthy</span>
        </div>
      </div>

      <div className="space-y-2">
        {(Object.keys(counts) as FieldHealthStatus[]).map((k) => (
          <div key={k} className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DOT_HEX[k] }} />
            <span className="text-slate-600">{FIELD_HEALTH_STYLES[k].label}</span>
            <span className="font-semibold text-[#0D1B2A] ml-1">{counts[k]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
