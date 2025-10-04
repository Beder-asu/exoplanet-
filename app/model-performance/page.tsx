"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSettings } from "@/lib/settings-store"

export default function ModelPerformancePage() {
  const [modelName, setModelName] = useState("Random Forest")
  const [datasetName, setDatasetName] = useState("K2 + Kepler Merged")

  useEffect(() => {
    const settings = getSettings()
    setModelName(settings.modelName)
    setDatasetName(settings.datasetName)
  }, [])

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">Model Performance</h1>
            <p className="text-slate-400">Evaluation metrics and confusion matrix - {datasetName}</p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-400">Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">94.2%</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-400">Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">92.8%</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-400">Recall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-500">91.5%</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-400">F1-Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-500">92.1%</div>
              </CardContent>
            </Card>
          </div>

          {/* Current Model */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Current Model</CardTitle>
                <Badge className="bg-blue-600 text-white">{modelName}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-8 text-sm">
                <div>
                  <span className="text-slate-400">Training Samples: </span>
                  <span className="text-white font-semibold">10,543</span>
                </div>
                <div>
                  <span className="text-slate-400">Test Samples: </span>
                  <span className="text-white font-semibold">2,635</span>
                </div>
                <div>
                  <span className="text-slate-400">Features: </span>
                  <span className="text-white font-semibold">12</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confusion Matrix */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Confusion Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div></div>
                  <div className="text-sm font-semibold text-blue-400">Confirmed</div>
                  <div className="text-sm font-semibold text-orange-400">Candidate</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center justify-end pr-4 text-sm font-semibold text-blue-400">
                    Confirmed
                  </div>
                  <div className="bg-green-900/50 border-2 border-green-600 rounded-lg p-8 text-center">
                    <div className="text-3xl font-bold text-green-400">850</div>
                  </div>
                  <div className="bg-red-900/50 border-2 border-red-600 rounded-lg p-8 text-center">
                    <div className="text-3xl font-bold text-red-400">45</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center justify-end pr-4 text-sm font-semibold text-orange-400">
                    Candidate
                  </div>
                  <div className="bg-red-900/50 border-2 border-red-600 rounded-lg p-8 text-center">
                    <div className="text-3xl font-bold text-red-400">35</div>
                  </div>
                  <div className="bg-green-900/50 border-2 border-green-600 rounded-lg p-8 text-center">
                    <div className="text-3xl font-bold text-green-400">920</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 pt-4">
                  <span className="text-sm text-blue-400">Predicted →</span>
                  <span className="text-sm text-slate-500">|</span>
                  <span className="text-sm text-blue-400">Actual ↓</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Visualizations */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Model Visualizations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg p-16 h-80 flex items-center justify-center">
                <p className="text-slate-500">Model visualizations will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
