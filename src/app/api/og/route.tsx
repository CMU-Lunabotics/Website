import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#dc2626',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>CMU</span>
          </div>
          <div>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0 }}>
              MoonMiners
            </h1>
            <p style={{ fontSize: '20px', margin: 0, opacity: 0.8 }}>
              NASA Lunabotics
            </p>
          </div>
        </div>
        <p style={{ fontSize: '24px', opacity: 0.9, textAlign: 'center' }}>
          Autonomous lunar excavation for NASA Lunabotics
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
