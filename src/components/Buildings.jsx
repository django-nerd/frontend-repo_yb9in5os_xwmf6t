import { useEffect, useRef } from 'react'

// Simple 3D-ish skyline using HTML canvas for Mexico City landmarks silhouettes
function Buildings() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      // background
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#050505')
      grad.addColorStop(1, '#0b0f0b')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // ground grid for depth
      ctx.strokeStyle = 'rgba(147, 197, 114, 0.18)'
      for (let i = 0; i < 20; i++) {
        const y = h * 0.55 + i * 18
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // skyline silhouettes (not to scale, stylized)
      function tower(x, baseW, height, color) {
        ctx.fillStyle = color
        const baseH = h * 0.55
        ctx.fillRect(x - baseW / 2, baseH - height, baseW, height)
        // glow
        ctx.shadowBlur = 18
        ctx.shadowColor = color
        ctx.fillRect(x - 1.5, baseH - height - 8, 3, 8)
        ctx.shadowBlur = 0
      }

      function triangleBuilding(x, baseW, height, color) {
        ctx.fillStyle = color
        const baseH = h * 0.55
        ctx.beginPath()
        ctx.moveTo(x, baseH - height)
        ctx.lineTo(x - baseW / 2, baseH)
        ctx.lineTo(x + baseW / 2, baseH)
        ctx.closePath()
        ctx.fill()
      }

      // Colors
      const glow = 'rgba(16,185,129,0.9)'
      const fill = 'rgba(16,185,129,0.25)'

      // Landmark-inspired silhouettes
      // Torre Latinoamericana
      tower(w * 0.25, 36, 220, fill)
      tower(w * 0.25, 8, 270, glow)

      // Torre Reforma (triangular profile)
      triangleBuilding(w * 0.45, 120, 260, fill)
      tower(w * 0.45, 10, 300, glow)

      // Chapultepec One-like tower
      tower(w * 0.62, 46, 240, fill)
      tower(w * 0.62, 12, 280, glow)

      // BBVA Bancomer style
      triangleBuilding(w * 0.78, 110, 210, fill)
      tower(w * 0.78, 8, 250, glow)

      // labels
      ctx.fillStyle = 'rgba(209, 250, 229, 0.9)'
      ctx.font = '12px Inter, system-ui, -apple-system, Segoe UI, Roboto'
      ctx.fillText('Mexico City skyline • stylized', 12, 20)
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
    <section id="buildings" className="relative w-full bg-black py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Buildings</h2>
          <p className="mt-2 text-emerald-100/80">A stylized skyline tribute to Mexico City landmarks.</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-black/60 shadow-2xl">
          <canvas ref={ref} className="h-[360px] w-full" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.12),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_40%)]" />
        </div>
      </div>
    </section>
  )
}

export default Buildings
