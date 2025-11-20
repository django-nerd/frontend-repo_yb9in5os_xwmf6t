import { useEffect, useRef } from 'react'

// Lightweight 3D plot using canvas and three.js-like math (no extra deps needed here)
// We'll render a simple wireframe surface plot to demonstrate 3D plotting.
function PlotShowcase() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const ctx = canvas.getContext('2d')

    function resize() {
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function project3D(x, y, z, width, height) {
      const scale = 120
      const angleX = -0.9
      const angleY = 0.8
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX)
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY)
      // rotate around X then Y (isometric-ish)
      let y1 = y * cosX - z * sinX
      let z1 = y * sinX + z * cosX
      let x2 = x * cosY + z1 * sinY
      let z2 = -x * sinY + z1 * cosY
      const px = width / 2 + x2 * scale
      const py = height / 2 + y1 * scale
      const depth = z2
      return { x: px, y: py, d: depth }
    }

    function draw() {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1

      // background glow
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, 'rgba(16,24,16,1)')
      grad.addColorStop(1, 'rgba(2,8,4,1)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      const nx = 40
      const ny = 26
      const xrange = 2.8
      const yrange = 1.7

      ctx.strokeStyle = 'rgba(110, 231, 183, 0.35)'

      // Draw grid lines in X
      for (let i = 0; i <= nx; i++) {
        const x = -xrange + (2 * xrange * i) / nx
        ctx.beginPath()
        let first = true
        for (let j = 0; j <= ny; j++) {
          const y = -yrange + (2 * yrange * j) / ny
          const r = Math.sqrt(x * x + y * y)
          const z = 0.25 * Math.sin(3 * r) * Math.cos(2 * x)
          const p = project3D(x, y, z, w, h)
          if (first) {
            ctx.moveTo(p.x, p.y)
            first = false
          } else {
            ctx.lineTo(p.x, p.y)
          }
        }
        ctx.stroke()
      }

      // Draw grid lines in Y
      for (let j = 0; j <= ny; j++) {
        const y = -yrange + (2 * yrange * j) / ny
        ctx.beginPath()
        let first = true
        for (let i = 0; i <= nx; i++) {
          const x = -xrange + (2 * xrange * i) / nx
          const r = Math.sqrt(x * x + y * y)
          const z = 0.25 * Math.sin(3 * r) * Math.cos(2 * y)
          const p = project3D(x, y, z, w, h)
          if (first) {
            ctx.moveTo(p.x, p.y)
            first = false
          } else {
            ctx.lineTo(p.x, p.y)
          }
        }
        ctx.stroke()
      }

      // axes labels
      ctx.fillStyle = 'rgba(209, 250, 229, 0.9)'
      ctx.font = '12px Inter, system-ui, -apple-system, Segoe UI, Roboto'
      ctx.fillText('3D Surface • demo plot', 12, 20)
      ctx.fillStyle = 'rgba(52, 211, 153, 0.9)'
      ctx.fillText('x', w - 20, h / 2)
      ctx.fillText('y', w / 2, 18)
    }

    function onResize() {
      resize()
      draw()
    }

    resize()
    draw()

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section id="plots" className="relative w-full bg-black py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">3D Plots</h2>
            <p className="mt-2 text-emerald-100/80">A wireframe surface to showcase analytical data.</p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-black/60 shadow-2xl">
          <canvas ref={canvasRef} className="h-[420px] w-full" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_40%),radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.08),transparent_40%)]" />
        </div>
      </div>
    </section>
  )
}

export default PlotShowcase
