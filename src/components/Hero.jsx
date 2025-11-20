import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black">
      {/* 3D Spline Background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex min-h-[80vh] items-center">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-200/90 backdrop-blur-sm">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
            Interactive 3D data for Mexico City
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Explore a living map of Mexico City
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-emerald-100/80">
            A dark, futuristic canvas for visualizing terrain, data points, and architectural landmarks — all in one immersive page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#plots" className="rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400">
              View 3D Plots
            </a>
            <a href="#buildings" className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/10">
              See Buildings
            </a>
          </div>
        </div>
      </div>

      {/* Gradient scrim so text stays legible, but don't block Spline interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
    </section>
  )
}

export default Hero
