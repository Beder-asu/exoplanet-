// API client for connecting to the Python FastAPI backend

// Use environment variable if available, otherwise fallback to localhost
const getApiBaseUrl = () => {
    if (typeof window === 'undefined') {
        // Server-side: use localhost for SSR
        return 'http://localhost:8000';
    }
    // Client-side: check for environment variable
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

// Types based on the API responses
export interface ModelInfo {
    id: string;
    name: string;
    description?: string;
}

export interface ClassificationStatus {
    disposition: string;
    confidence: number;
    modelUsed: string;
}

export interface ScatterPlotPoint {
    orbitalPeriod: number;
    planetaryRadius: number;
    disposition: string;
}

export interface Statistics {
    totalConfirmed?: number;
    candidates?: number;
    totalPredictions?: number;
    confirmed?: number;
    averageConfidence?: number;
}

export interface PredictionResult {
    id: number;
    disposition: string;
    confidence: number;
    orbitalPeriod: number;
    planetaryRadius: number;
    transitDuration: number;
    transitDepth: number;
}

export interface VisualizationData {
    uploadedData: Array<{ x: number; y: number; label: string }>;
    trainingData: Array<{ x: number; y: number; label: string }>;
}

export interface PredictionResponse {
    predictions: PredictionResult[];
    statistics: Statistics;
    visualizationData: VisualizationData;
}

export interface DashboardData {
    classificationStatus: ClassificationStatus;
    scatterPlotData: ScatterPlotPoint[];
    statistics: Statistics;
}

export interface ModelPerformanceData {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    confusionMatrix: {
        confirmed: { confirmed: number; candidate: number };
        candidate: { confirmed: number; candidate: number };
    };
    currentModel: {
        name: string;
        trainingSamples: number;
        testSamples: number;
        features: number;
    };
}

// API Error class
export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

// Base fetch wrapper with error handling
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new ApiError(response.status, errorText || response.statusText);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        // Handle network errors or JSON parsing errors
        throw new ApiError(0, `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// API methods
export const api = {
    // Health check
    async healthCheck(): Promise<{ status: string; models_loaded: number }> {
        return apiFetch('/health');
    },

    // Get available models
    async getModels(): Promise<{ models: ModelInfo[] }> {
        return apiFetch('/api/models');
    },

    // Update model settings
    async updateModelSettings(selectedModelId: string): Promise<{ success: boolean }> {
        return apiFetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify({ selectedModelId }),
        });
    },

    // Get model performance
    async getModelPerformance(): Promise<ModelPerformanceData> {
        return apiFetch('/api/model-performance');
    },

    // Get dashboard data
    async getDashboardData(): Promise<DashboardData> {
        return apiFetch('/api/dashboard');
    },

    // Get dataset info
    async getDatasetInfo(): Promise<any> {
        return apiFetch('/api/dataset-info');
    },

    // Make predictions with file upload
    async makePrediction(file: File, modelId: string): Promise<PredictionResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('modelId', modelId);

        const response = await fetch(`${API_BASE_URL}/api/predict`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new ApiError(response.status, errorText || response.statusText);
        }

        return await response.json();
    },

    // Make single prediction with manual data
    async makeSinglePrediction(data: {
        orbitalPeriod: number;
        transitDuration: number;
        planetaryRadius: number;
        transitDepth: number;
    }, modelId: string): Promise<PredictionResponse> {
        // Convert manual data to CSV format for the API
        const csvData = `orbital_period,transit_duration,planet_radius_earth,transit_depth
${data.orbitalPeriod},${data.transitDuration},${data.planetaryRadius},${data.transitDepth}`;

        const blob = new Blob([csvData], { type: 'text/csv' });
        const file = new File([blob], 'manual_data.csv', { type: 'text/csv' });

        return this.makePrediction(file, modelId);
    },
};

// Helper function to check if API is available
export async function checkApiHealth(): Promise<boolean> {
    try {
        await api.healthCheck();
        return true;
    } catch {
        return false;
    }
}