'use client'

const LOGOS = [
  { name: 'AutoCAD' },
  { name: 'SolidWorks' },
  { name: 'Fusion 360' },
  { name: 'Blender' },
  { name: 'Cura' },
  { name: 'PrusaSlicer' },
  { name: 'Rhino 3D' },
  { name: 'ZBrush' },
]

export default function LogoRail() {
  // Duplicate logos for seamless infinite scroll
  const allLogos = [...LOGOS, ...LOGOS]

  return (
    <section className="py-14 bg-bg-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8 reveal-on-scroll">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Supported Tools</p>
          <p className="text-lg text-text-secondary">Works with every major CAD & slicer platform</p>
        </div>

        {/* Continuous marquee */}
        <div className="overflow-hidden">
          <div className="animate-marquee">
            {allLogos.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-6 lg:mx-10 flex items-center justify-center"
                style={{ minWidth: '140px' }}
              >
                <div
                  className="px-6 py-3 rounded-full border transition-all duration-300 hover:border-primary/40 hover:text-primary"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                  }}
                >
                  {logo.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}