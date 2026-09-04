import type { VisualCondition } from './field-status'

/** Standard 10-point test grid layout (percent of field width/height), matching wireframe 02/03. */
export const DEFAULT_TEST_POINT_LAYOUT: { x: number; y: number }[] = [
  { x: 0.16, y: 0.26 },
  { x: 0.5, y: 0.26 },
  { x: 0.84, y: 0.26 },
  { x: 0.1, y: 0.54 },
  { x: 0.5, y: 0.54 },
  { x: 0.9, y: 0.54 },
  { x: 0.06, y: 0.83 },
  { x: 0.32, y: 0.83 },
  { x: 0.68, y: 0.83 },
  { x: 0.94, y: 0.83 },
]

export interface TestLocation {
  index: number // 1-10
  name?: string
  x: number
  y: number
  gmax: number
  infillDepth: number
  shear: number
  visualCondition: VisualCondition
  notes?: string
  photoCount?: number
  lat?: number
  lng?: number
  testedBy?: string
  testedDate?: string
}

/** Read the flexible testingLocations JSON column into typed TestLocation records, filling in default grid positions if missing. */
export function parseTestLocations(raw: unknown): TestLocation[] {
  if (!Array.isArray(raw)) return []
  return raw.map((p, i) => {
    const r = (p ?? {}) as Record<string, unknown>
    const layout = DEFAULT_TEST_POINT_LAYOUT[i] ?? { x: 0.5, y: 0.5 }
    return {
      index: Number(r.index ?? i + 1),
      name: typeof r.name === 'string' ? r.name : undefined,
      x: typeof r.x === 'number' ? r.x : layout.x,
      y: typeof r.y === 'number' ? r.y : layout.y,
      gmax: Number(r.gmax ?? r.gmaxReading ?? 0),
      infillDepth: Number(r.infillDepth ?? r.infillDepthReading ?? 0),
      shear: Number(r.shear ?? r.shearReading ?? 0),
      visualCondition: (r.visualCondition as VisualCondition) ?? 'good',
      notes: typeof r.notes === 'string' ? r.notes : undefined,
      photoCount: typeof r.photoCount === 'number' ? r.photoCount : Array.isArray(r.photos) ? r.photos.length : 0,
      lat: typeof r.lat === 'number' ? r.lat : undefined,
      lng: typeof r.lng === 'number' ? r.lng : undefined,
      testedBy: typeof r.testedBy === 'string' ? r.testedBy : undefined,
      testedDate: typeof r.testedDate === 'string' ? r.testedDate : undefined,
    }
  })
}
