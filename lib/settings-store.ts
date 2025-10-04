type ModelType = "random-forest" | "decision-tree" | "xgboost"
type DatasetType = "k2" | "k2-kepler"

interface Settings {
  model: ModelType
  dataset: DatasetType
  modelName: string
  datasetName: string
}

const SETTINGS_KEY = "exoplanet-settings"

// Default to Random Forest and K2 + Kepler merged dataset
const DEFAULT_SETTINGS: Settings = {
  model: "random-forest",
  dataset: "k2-kepler",
  modelName: "Random Forest",
  datasetName: "K2 + Kepler Merged",
}

export function getSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS

  const stored = localStorage.getItem(SETTINGS_KEY)
  if (!stored) return DEFAULT_SETTINGS

  try {
    return JSON.parse(stored)
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") return
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

// Get available models based on selected dataset
export function getAvailableModels(dataset: DatasetType): Array<{ value: ModelType; label: string }> {
  if (dataset === "k2") {
    return [
      { value: "random-forest", label: "Random Forest" },
      { value: "decision-tree", label: "Decision Trees" },
      { value: "xgboost", label: "XGBoost" },
    ]
  } else {
    // k2-kepler only has Random Forest
    return [{ value: "random-forest", label: "Random Forest" }]
  }
}
