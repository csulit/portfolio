import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const WIDTH = 1200
const HEIGHT = 630

const BG = '#121215'
const ACCENT = '#5CCC8E'
const TEXT_PRIMARY = '#EDEDEC'
const TEXT_SECONDARY = '#8B8B92'
const SURFACE = '#1C1C21'

const FONTS_DIR = join(import.meta.dir, '..', 'node_modules', '@fontsource', 'dm-sans', 'files')

function loadFont(weight: number): ArrayBuffer {
  const path = join(FONTS_DIR, `dm-sans-latin-${weight}-normal.woff`)
  const buffer = readFileSync(path)
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
}

async function main() {
  const medium = loadFont(500)
  const bold = loadFont(700)
  const extrabold = loadFont(800)

  const svg = await satori(
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 60,
        fontFamily: 'DM Sans',
      }}
    >
      {/* Top: site name with accent bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 4,
            height: 28,
            background: ACCENT,
            borderRadius: 2,
          }}
        />
        <span style={{ fontSize: 22, fontWeight: 700, color: ACCENT }}>
          cgelo.dev
        </span>
      </div>

      {/* Middle: main content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            lineHeight: 1.1,
          }}
        >
          Hi, I'm Gelo.
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: ACCENT,
            lineHeight: 1.3,
          }}
        >
          Senior Software Engineer & AI Solutions Builder
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: TEXT_SECONDARY,
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          I build full-stack web apps, mobile experiences, and AI-powered tools
          that ship fast and scale well.
        </div>
      </div>

      {/* Bottom: availability badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: SURFACE,
            borderRadius: 999,
            padding: '8px 16px',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: ACCENT,
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY }}>
            Available for freelance work
          </span>
        </div>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'DM Sans', data: medium, weight: 500, style: 'normal' as const },
        { name: 'DM Sans', data: bold, weight: 700, style: 'normal' as const },
        { name: 'DM Sans', data: extrabold, weight: 800, style: 'normal' as const },
      ],
    },
  )

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  })
  const png = resvg.render().asPng()

  const outPath = join(import.meta.dir, '..', 'public', 'og.png')
  writeFileSync(outPath, png)
  console.log(`Generated OG image: ${outPath} (${png.byteLength} bytes)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
