import Hero from './components/Hero'
import PlotShowcase from './components/PlotShowcase'
import Buildings from './components/Buildings'

function App() {
  return (
    <div className="min-h-screen w-full bg-black">
      <Hero />
      <PlotShowcase />
      <Buildings />
      <footer className="border-t border-white/10 bg-black/60 py-10">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 text-emerald-100/70">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p>Made for exploring 3D plots and architecture in CDMX.</p>
            <div className="text-sm opacity-70">Interactive • Futuristic • Educational</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
