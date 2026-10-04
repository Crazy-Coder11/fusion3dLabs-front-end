import { ImageResponse } from 'next/og'

export const alt = 'Fusion3DLabs custom 3D printing services in India'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          color: '#062817',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 55%, #dcfce7 100%)',
        }}
      >
        <div style={{ display: 'flex', color: '#16a34a', fontSize: 28, fontWeight: 700, letterSpacing: 6 }}>
          FUSION3DLABS
        </div>
        <div style={{ display: 'flex', maxWidth: 980, marginTop: 34, fontSize: 72, lineHeight: 1.08, fontWeight: 800 }}>
          Custom 3D Printing Services in India
        </div>
        <div style={{ display: 'flex', marginTop: 36, fontSize: 30, color: '#3f5f4c' }}>
          From idea or CAD file to a finished part · Pan-India delivery
        </div>
      </div>
    ),
    size,
  )
}
