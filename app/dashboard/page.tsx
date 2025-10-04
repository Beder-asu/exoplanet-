import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">Dashboard</h1>
            <p className="text-slate-400">NASA Exoplanet Database Overview</p>
          </div>

          {/* Classification Status */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Classification Status</CardTitle>
              <CardDescription className="text-slate-400">
                Upload data to see classification results here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-1">Disposition</div>
                  <div className="text-2xl font-bold text-white">—</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-1">Confidence</div>
                  <div className="text-2xl font-bold text-white">—</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-1">Model Used</div>
                  <Badge className="bg-blue-600 text-white mt-2">Random Forest</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scatter Plot */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Orbital Period vs Planetary Radius</CardTitle>
              <CardDescription className="text-slate-400">
                Interactive scatter plot of NASA exoplanet data. Upload your data to see it overlayed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-800 rounded-lg p-8 h-96 flex items-center justify-center relative">
                {/* Simplified scatter plot representation */}
                <div className="absolute inset-0 p-12">
                  <div className="relative w-full h-full border-l-2 border-b-2 border-slate-600">
                    {/* Y-axis labels */}
                    <div className="absolute -left-16 top-0 text-xs text-slate-400">24 R⊕</div>
                    <div className="absolute -left-16 top-1/4 text-xs text-slate-400">18 R⊕</div>
                    <div className="absolute -left-16 top-2/4 text-xs text-slate-400">12 R⊕</div>
                    <div className="absolute -left-16 top-3/4 text-xs text-slate-400">6 R⊕</div>
                    <div className="absolute -left-16 bottom-0 text-xs text-slate-400">0 R⊕</div>

                    {/* X-axis labels */}
                    <div className="absolute -bottom-8 left-0 text-xs text-slate-400">0 days</div>
                    <div className="absolute -bottom-8 left-1/4 text-xs text-slate-400">95 days</div>
                    <div className="absolute -bottom-8 left-2/4 text-xs text-slate-400">190 days</div>
                    <div className="absolute -bottom-8 left-3/4 text-xs text-slate-400">285 days</div>
                    <div className="absolute -bottom-8 right-0 text-xs text-slate-400">380 days</div>

                    {/* Axis labels */}
                    <div className="absolute -left-24 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-slate-300 whitespace-nowrap">
                      Planetary Radius (Earth radii)
                    </div>
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-sm text-slate-300">
                      Orbital Period (days)
                    </div>

                    {Array.from({ length: 50 }).map((_, i) => {
                      const colors = ["bg-green-500", "bg-orange-500"]
                      const color = colors[Math.floor(Math.random() * colors.length)]
                      return (
                        <div
                          key={i}
                          className={`absolute w-2 h-2 rounded-full ${color}`}
                          style={{
                            left: `${Math.random() * 90}%`,
                            top: `${Math.random() * 90}%`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-slate-300">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-slate-300">Candidate</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-sm text-slate-400">Total Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-500">5,502</div>
                <p className="text-sm text-slate-400 mt-1">NASA Database</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-sm text-slate-400">Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-orange-500">4,374</div>
                <p className="text-sm text-slate-400 mt-1">Awaiting Confirmation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
