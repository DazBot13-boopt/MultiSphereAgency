import { ImageResponse } from 'next/og'

export const alt = "MultiSphere Agency — L'union des expertises, la force de vos projets"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 20% 20%, rgba(13,110,253,0.35), transparent 45%), radial-gradient(circle at 85% 75%, rgba(0,172,193,0.30), transparent 45%), linear-gradient(135deg, #060b1e 0%, #0a1330 55%, #12224d 100%)',
          padding: '72px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row: logo mark + brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e8eefc 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(13,110,253,0.35)',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '4px solid #0d6efd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#00ACC1',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#0d6efd',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '-4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#00ACC1',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                color: 'white',
                fontSize: '34px',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                display: 'flex',
              }}
            >
              MultiSphere
            </div>
            <div
              style={{
                color: '#00ACC1',
                fontSize: '20px',
                fontWeight: 600,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                display: 'flex',
                marginTop: '2px',
              }}
            >
              AGENCY
            </div>
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontSize: '62px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            maxWidth: '980px',
          }}
        >
          <div style={{ display: 'flex' }}>L'union des expertises,</div>
          <div
            style={{
              display: 'flex',
              background: 'linear-gradient(90deg, #4d9bff 0%, #00ACC1 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            la force de vos projets.
          </div>
        </div>

        {/* Bottom: expertises tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '48px',
            gap: '16px',
          }}
        >
          {['Événementiel', 'Communication', 'Web & Mobile', 'Cybersécurité', 'Gestion'].map(
            (tag, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#e8eefc',
                  fontSize: '22px',
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* Footer line */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '72px',
            right: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '22px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#00ACC1',
                display: 'flex',
              }}
            />
            Abomey-Calavi, Bénin
          </div>
          <div style={{ display: 'flex' }}>multisphere.agency@gmail.com</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
