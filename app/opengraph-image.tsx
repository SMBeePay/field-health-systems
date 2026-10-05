import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Field Health Systems - Independent GMAX and Turf Field Testing'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/fhs-horizontal-approved-transparent-6x.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0D1B2A',
          padding: 64,
        }}
      >
        <div style={{ display: 'flex', background: '#FFFFFF', borderRadius: 20, padding: '28px 36px', alignSelf: 'flex-start' }}>
          <img src={logoSrc} width={554} height={90} alt="" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
            Independent GMAX & Turf Field Testing
          </div>
          <div style={{ fontSize: 32, color: '#43B02A', marginTop: 24 }}>
            ASTM F1936 · Infill Depth · Written Reports
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#9FB3C8' }}>fieldhealthsystems.com</div>
      </div>
    ),
    size,
  )
}
