import Link from "next/link"
import { Sparkles, Satellite } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-20 left-1/4">
        <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
      </div>
      <div className="absolute top-40 right-1/3">
        <Sparkles className="w-4 h-4 text-purple-300 animate-pulse delay-100" />
      </div>
      <div className="absolute top-32 right-1/4">
        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse delay-200" />
      </div>

      {/* Planet icon */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
        <div className="w-20 h-20 rounded-full bg-slate-700 relative">
          <div className="absolute inset-0 rounded-full border-4 border-slate-500 transform rotate-12"></div>
        </div>
      </div>

      {/* Satellite icon */}
      <div className="absolute top-1/3 right-1/4">
        <Satellite className="w-12 h-12 text-purple-400" />
      </div>

      <div className="text-center z-10 px-4">
        <h1 className="text-6xl md:text-7xl font-bold text-purple-400 mb-4 tracking-tight">Exoplanet Explorer</h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12">Discover exoplanets using machine learning</p>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl"
          >
            Let&apos;s Explore
          </Button>
        </Link>
      </div>
    </div>
  )
}
