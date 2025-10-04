"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { api, type ModelInfo, type PredictionResponse, ApiError } from "@/lib/api"

export default function UploadDataPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [availableModels, setAvailableModels] = useState<ModelInfo[]>([])
  const [showResults, setShowResults] = useState(false)
  const [predictionResults, setPredictionResults] = useState<PredictionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [manualData, setManualData] = useState({
    orbitalPeriod: "",
    transitDuration: "",
    planetaryRadius: "",
    transitDepth: ""
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load available models on component mount
  useEffect(() => {
    const loadModels = async () => {
      try {
        const response = await api.getModels()
        setAvailableModels(response.models)
        if (response.models.length > 0) {
          setSelectedModel(response.models[0].id)
        }
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Failed to load models")
      }
    }

    loadModels()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError("")
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  const handleCSVUpload = async () => {
    if (!selectedFile || !selectedModel) {
      setError("Please select a file and model")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const results = await api.makePrediction(selectedFile, selectedModel)
      setPredictionResults(results)
      setShowResults(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to make predictions")
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualPrediction = async () => {
    if (!selectedModel) {
      setError("Please select a model")
      return
    }

    // Validate manual input
    const { orbitalPeriod, transitDuration, planetaryRadius, transitDepth } = manualData
    if (!orbitalPeriod || !transitDuration || !planetaryRadius || !transitDepth) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const data = {
        orbitalPeriod: parseFloat(orbitalPeriod),
        transitDuration: parseFloat(transitDuration),
        planetaryRadius: parseFloat(planetaryRadius),
        transitDepth: parseFloat(transitDepth)
      }

      const results = await api.makeSinglePrediction(data, selectedModel)
      setPredictionResults(results)
      setShowResults(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to make prediction")
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualDataChange = (field: string, value: string) => {
    setManualData(prev => ({ ...prev, [field]: value }))
    setError("")
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

          {/* Model Selection */}
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Model Selection</CardTitle>
              <CardDescription className="text-slate-400">
                Choose the ML model for classification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="model-select" className="text-slate-300">
                  Select Model
                </Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Select a model..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {availableModels.map((model) => (
                      <SelectItem key={model.id} value={model.id} className="text-white">
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Alert className="bg-red-900/20 border-red-800 mb-6">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

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
                  <CardDescription className="text-slate-400">
                    Upload a CSV file with columns: orbital_period, transit_duration, planet_radius_earth, transit_depth
                  </CardDescription>
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
                      <span className="text-sm text-slate-500">
                        {selectedFile ? selectedFile.name : "No file chosen"}
                      </span>
                    </div>
                  </div>
                  <Button
                    disabled={!selectedFile || !selectedModel || isLoading}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={handleCSVUpload}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Classifying...
                      </>
                    ) : (
                      "Classify Data"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Manual Data Entry</CardTitle>
                  <CardDescription className="text-slate-400">
                    Enter exoplanet parameters manually for classification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="orbital-period" className="text-slate-300">
                        Orbital Period (days)
                      </Label>
                      <Input
                        id="orbital-period"
                        type="number"
                        placeholder="e.g., 3.14"
                        value={manualData.orbitalPeriod}
                        onChange={(e) => handleManualDataChange("orbitalPeriod", e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transit-duration" className="text-slate-300">
                        Transit Duration (hours)
                      </Label>
                      <Input
                        id="transit-duration"
                        type="number"
                        placeholder="e.g., 3.14"
                        value={manualData.transitDuration}
                        onChange={(e) => handleManualDataChange("transitDuration", e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="planetary-radius" className="text-slate-300">
                        Planetary Radius (Earth radii)
                      </Label>
                      <Input
                        id="planetary-radius"
                        type="number"
                        placeholder="e.g., 3.14"
                        value={manualData.planetaryRadius}
                        onChange={(e) => handleManualDataChange("planetaryRadius", e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transit-depth" className="text-slate-300">
                        Transit Depth (ppm)
                      </Label>
                      <Input
                        id="transit-depth"
                        type="number"
                        placeholder="e.g., 3.14"
                        value={manualData.transitDepth}
                        onChange={(e) => handleManualDataChange("transitDepth", e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                  <Button
                    disabled={!selectedModel || isLoading}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={handleManualPrediction}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Classifying...
                      </>
                    ) : (
                      "Classify This Object"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {showResults && predictionResults && (
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
                      <div className="text-2xl font-bold text-white">
                        {predictionResults.statistics.totalPredictions || 0}
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6">
                      <div className="text-sm text-slate-400 mb-1">Confirmed</div>
                      <div className="text-2xl font-bold text-green-500">
                        {predictionResults.statistics.confirmed || 0}
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6">
                      <div className="text-sm text-slate-400 mb-1">Candidates</div>
                      <div className="text-2xl font-bold text-orange-500">
                        {predictionResults.statistics.candidates || 0}
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6">
                      <div className="text-sm text-slate-400 mb-1">Avg Confidence</div>
                      <div className="text-2xl font-bold text-blue-500">
                        {predictionResults.statistics.averageConfidence
                          ? `${(predictionResults.statistics.averageConfidence * 100).toFixed(1)}%`
                          : "—"}
                      </div>
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
                        {predictionResults.visualizationData.trainingData.map((point, i) => (
                          <div
                            key={`train-${i}`}
                            className={`absolute w-1.5 h-1.5 rounded-full ${point.label === "Confirmed" ? "bg-green-500/40" : "bg-orange-500/40"
                              }`}
                            style={{
                              left: `${Math.min(90, (point.x / 380) * 90)}%`,
                              top: `${Math.max(0, 90 - (point.y / 24) * 90)}%`,
                            }}
                          />
                        ))}

                        {/* Uploaded data (larger dots) */}
                        {predictionResults.visualizationData.uploadedData.map((point, i) => (
                          <div
                            key={`upload-${i}`}
                            className={`absolute w-3 h-3 rounded-full ${point.label === "Confirmed" ? "bg-green-500" : "bg-orange-500"
                              } ring-2 ring-white/50`}
                            style={{
                              left: `${Math.min(90, (point.x / 380) * 90)}%`,
                              top: `${Math.max(0, 90 - (point.y / 24) * 90)}%`,
                            }}
                          />
                        ))}
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

              {/* Detailed Results Table */}
              {predictionResults.predictions.length > 1 && (
                <Card className="bg-slate-900 border-slate-800 mt-8">
                  <CardHeader>
                    <CardTitle className="text-white">Detailed Results</CardTitle>
                    <CardDescription className="text-slate-400">
                      Individual predictions for each object
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-700">
                            <th className="text-left p-3 text-slate-300">ID</th>
                            <th className="text-left p-3 text-slate-300">Disposition</th>
                            <th className="text-left p-3 text-slate-300">Confidence</th>
                            <th className="text-left p-3 text-slate-300">Orbital Period</th>
                            <th className="text-left p-3 text-slate-300">Radius</th>
                          </tr>
                        </thead>
                        <tbody>
                          {predictionResults.predictions.slice(0, 10).map((pred) => (
                            <tr key={pred.id} className="border-b border-slate-800">
                              <td className="p-3 text-slate-400">{pred.id}</td>
                              <td className="p-3">
                                <span className={`px-2 py-1 rounded text-xs ${pred.disposition === "Confirmed"
                                    ? "bg-green-600 text-white"
                                    : "bg-orange-600 text-white"
                                  }`}>
                                  {pred.disposition}
                                </span>
                              </td>
                              <td className="p-3 text-slate-300">
                                {(pred.confidence * 100).toFixed(1)}%
                              </td>
                              <td className="p-3 text-slate-300">
                                {pred.orbitalPeriod.toFixed(2)} days
                              </td>
                              <td className="p-3 text-slate-300">
                                {pred.planetaryRadius.toFixed(2)} R⊕
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {predictionResults.predictions.length > 10 && (
                        <p className="text-slate-400 text-sm mt-3 text-center">
                          Showing first 10 of {predictionResults.predictions.length} results
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
