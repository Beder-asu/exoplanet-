"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from "lucide-react"

export default function UploadDataPage() {
  const [selectedFile, setSelectedFile] = useState<string>("No file chosen")
  const [showResults, setShowResults] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">Upload Data</h1>
            <p className="text-slate-400">Import your exoplanet data for classification</p>
          </div>

          <Tabs defaultValue="csv" className="w-full">
            <TabsList className="bg-slate-900 border border-slate-800 mb-6">
              <TabsTrigger value="csv" className="data-[state=active]:bg-slate-800">
                CSV Upload
              </TabsTrigger>
              <TabsTrigger value="manual" className="data-[state=active]:bg-slate-800">
                Manual Input
              </TabsTrigger>
            </TabsList>

            <TabsContent value="csv">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Upload CSV File</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-16 text-center bg-slate-800/50">
                    <Upload className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400 mb-4">Drag and drop your CSV file here, or click to browse</p>
                    <div className="flex items-center justify-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        className="bg-slate-800 border-slate-700 text-white"
                        onClick={handleChooseFile}
                      >
                        Choose File
                      </Button>
                      <span className="text-sm text-slate-500">{selectedFile}</span>
                    </div>
                  </div>
                  <Button
                    disabled={selectedFile === "No file chosen"}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => setShowResults(true)}
                  >
                    Classify Data
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Manual Data Entry</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="orbital-period" className="text-slate-300">
                        Orbital Period (days)
                      </Label>
                      <Input
                        id="orbital-period"
                        placeholder="e.g., 3.14"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transit-duration" className="text-slate-300">
                        Transit Duration (hours)
                      </Label>
                      <Input
                        id="transit-duration"
                        placeholder="e.g., 3.14"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="planetary-radius" className="text-slate-300">
                        Planetary Radius (Earth radii)
                      </Label>
                      <Input
                        id="planetary-radius"
                        placeholder="e.g., 3.14"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transit-depth" className="text-slate-300">
                        Transit Depth (ppm)
                      </Label>
                      <Input
                        id="transit-depth"
                        placeholder="e.g., 3.14"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => setShowResults(true)}
                  >
                    Classify This Object
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {showResults && (
            <>
              {/* Prediction Statistics */}
              <Card className="bg-slate-900 border-slate-800 mt-8">
                <CardHeader>
                  <CardTitle className="text-white">Prediction Statistics</CardTitle>
                  <CardDescription className="text-slate-400">Summary of classification results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-slate-800 rounded-lg p-6">
                      <div className="text-sm text-slate-400 mb-1">Total Predictions</div>
                      <div className="text-2xl font-bold text-white">150</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6">
                      <div className="text-sm text-slate-400 mb-1">Confirmed</div>
                      <div className="text-2xl font-bold text-green-500">89</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6">
                      <div className="text-sm text-slate-400 mb-1">Candidates</div>
                      <div className="text-2xl font-bold text-orange-500">61</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6">
                      <div className="text-sm text-slate-400 mb-1">Avg Confidence</div>
                      <div className="text-2xl font-bold text-blue-500">87.3%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visualization: Uploaded vs Training Data */}
              <Card className="bg-slate-900 border-slate-800 mt-8">
                <CardHeader>
                  <CardTitle className="text-white">Data Visualization</CardTitle>
                  <CardDescription className="text-slate-400">
                    Your uploaded data (larger dots) overlayed on training data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-800 rounded-lg p-8 h-96 flex items-center justify-center relative">
                    <div className="absolute inset-0 p-12">
                      <div className="relative w-full h-full border-l-2 border-b-2 border-slate-600">
                        {/* Axis labels */}
                        <div className="absolute -left-16 top-0 text-xs text-slate-400">24 R⊕</div>
                        <div className="absolute -left-16 bottom-0 text-xs text-slate-400">0 R⊕</div>
                        <div className="absolute -bottom-8 left-0 text-xs text-slate-400">0 days</div>
                        <div className="absolute -bottom-8 right-0 text-xs text-slate-400">380 days</div>

                        <div className="absolute -left-24 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-slate-300 whitespace-nowrap">
                          Planetary Radius (Earth radii)
                        </div>
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-sm text-slate-300">
                          Orbital Period (days)
                        </div>

                        {/* Training data (small dots) */}
                        {Array.from({ length: 40 }).map((_, i) => {
                          const colors = ["bg-green-500/40", "bg-orange-500/40"]
                          const color = colors[Math.floor(Math.random() * colors.length)]
                          return (
                            <div
                              key={`train-${i}`}
                              className={`absolute w-1.5 h-1.5 rounded-full ${color}`}
                              style={{
                                left: `${Math.random() * 90}%`,
                                top: `${Math.random() * 90}%`,
                              }}
                            />
                          )
                        })}

                        {/* Uploaded data (larger dots) */}
                        {Array.from({ length: 15 }).map((_, i) => {
                          const colors = ["bg-green-500", "bg-orange-500"]
                          const color = colors[Math.floor(Math.random() * colors.length)]
                          return (
                            <div
                              key={`upload-${i}`}
                              className={`absolute w-3 h-3 rounded-full ${color} ring-2 ring-white/50`}
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
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                      <span className="text-sm text-slate-400">Training Data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-white/50"></div>
                      <span className="text-sm text-slate-300">Your Data</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
