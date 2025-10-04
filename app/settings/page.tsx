"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { getSettings, saveSettings, getAvailableModels } from "@/lib/settings-store"

export default function SettingsPage() {
  const [dataset, setDataset] = useState<"k2" | "k2-kepler">("k2-kepler")
  const [model, setModel] = useState<"random-forest" | "decision-tree" | "xgboost">("random-forest")
  const [availableModels, setAvailableModels] = useState(getAvailableModels("k2-kepler"))

  useEffect(() => {
    const settings = getSettings()
    setDataset(settings.dataset)
    setModel(settings.model)
    setAvailableModels(getAvailableModels(settings.dataset))
  }, [])

  const handleDatasetChange = (value: "k2" | "k2-kepler") => {
    setDataset(value)
    const models = getAvailableModels(value)
    setAvailableModels(models)
    // Reset to first available model if current model not available
    if (!models.find((m) => m.value === model)) {
      setModel(models[0].value)
    }
  }

  const handleSaveSettings = () => {
    const modelName = availableModels.find((m) => m.value === model)?.label || "Random Forest"
    const datasetName = dataset === "k2" ? "K2 Dataset" : "K2 + Kepler Merged"

    saveSettings({
      model,
      dataset,
      modelName,
      datasetName,
    })

    alert("Settings saved successfully!")
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-2">Settings</h1>
            <p className="text-slate-400">Configure model and visualization settings</p>
          </div>

          {/* Data Set Selection - moved first */}
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Data Set Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataset" className="text-slate-300">
                  Classification Data Set
                </Label>
                <Select value={dataset} onValueChange={handleDatasetChange}>
                  <SelectTrigger id="dataset" className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="k2">K2 Dataset</SelectItem>
                    <SelectItem value="k2-kepler">K2 + Kepler Merged Dataset</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Model Selection */}
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Model Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model" className="text-slate-300">
                  Classification Model
                </Label>
                <Select value={model} onValueChange={(v) => setModel(v as any)}>
                  <SelectTrigger id="model" className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {availableModels.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-slate-500">
                  {dataset === "k2"
                    ? "K2 Dataset supports: Random Forest, Decision Trees, XGBoost"
                    : "K2 + Kepler Merged Dataset supports: Random Forest only"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Visualization Settings */}
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Visualization Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="overlay" className="text-slate-300">
                    Classification Data Set
                  </Label>
                  <p className="text-sm text-slate-500">Overlay NASA data with user data</p>
                </div>
                <Switch id="overlay" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Orbital Period Range (days)</Label>
                  <div className="flex gap-4 text-sm text-slate-400">
                    <span>1</span>
                    <span>1000</span>
                  </div>
                </div>
                <Slider defaultValue={[500]} max={1000} step={1} className="[&_[role=slider]]:bg-purple-600" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Radius Range (Earth radii)</Label>
                  <div className="flex gap-4 text-sm text-slate-400">
                    <span>0.5</span>
                    <span>30</span>
                  </div>
                </div>
                <Slider defaultValue={[15]} max={30} step={0.5} className="[&_[role=slider]]:bg-purple-600" />
              </div>
            </CardContent>
          </Card>

          {/* Classification Thresholds */}
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Classification Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Confidence Threshold (%)</Label>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-600 [&_[role=slider]]:to-pink-600"
                />
                <p className="text-sm text-slate-500">Minimum confidence required for classification</p>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSaveSettings}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Save Settings
          </Button>
        </div>
      </main>
    </div>
  )
}
