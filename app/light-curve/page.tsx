"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function LightCurvePage() {
  const [selectedFile, setSelectedFile] = useState<string>("No file chosen")

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">Light Curve Analysis</h1>
            <p className="text-slate-400">Upload and analyze transit light curves</p>
          </div>

          {/* Upload Section */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Upload Light Curve Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-16 text-center bg-slate-800/50">
                <Upload className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">Upload raw light curve data from TESS or Kepler</p>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="outline" className="bg-slate-800 border-slate-700 text-white">
                    Choose File
                  </Button>
                  <span className="text-sm text-slate-500">{selectedFile}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preprocessed Curve */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Preprocessed Curve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg p-16 h-80 flex items-center justify-center">
                <p className="text-slate-500">Cleaned light curve will be displayed here after upload</p>
              </div>
            </CardContent>
          </Card>

          {/* Classification Result */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Classification Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-1">Disposition</div>
                  <div className="text-2xl font-bold text-white">—</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-1">Confidence</div>
                  <div className="text-2xl font-bold text-white">—</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-1">Transit Detected</div>
                  <div className="text-2xl font-bold text-white">—</div>
                </div>
              </div>
              <Button disabled className="w-full bg-slate-700 text-slate-400 cursor-not-allowed">
                Analyze Light Curve (Coming in Future Version)
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
