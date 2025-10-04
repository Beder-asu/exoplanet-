# Exoplanet Explorer - Full Stack Application
 - Minimal Live Demo: https://barakota15.github.io/Exoplanet-Explorer/
```bash
available in Demo Folder
``` 
 - Final UI preview: https://v0-exoplanetexplorer.vercel.app/dashboard
```bash
 the repo main files
``` 
 - Run the project manually to all the experience
### Note: API is tested separately

A complete exoplanet classification system with a **Next.js frontend** and **Python FastAPI backend** using machine learning models.

## 🚀 How to Run the Project

### Prerequisites
- **Python 3.8+** installed on your system
- **Node.js 18+** and npm installed
- Git (to clone the repository)

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Beder-asu/exoplanet-.git
cd exoplanet-
```

### Step 2: Start the Python API Backend

Open a **first terminal** and run:

```bash
# Navigate to the API directory
cd nasa-space-apps-api

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
python src/main.py
```

✅ **API will be running at:** `http://localhost:8000`  
✅ **API Documentation:** `http://localhost:8000/docs`

### Step 3: Start the Next.js Frontend

Open a **second terminal** (keep the first one running) and run:

```bash
# Make sure you're in the main project directory
# (not inside nasa-space-apps-api)

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

✅ **Frontend will be running at:** `http://localhost:3000`

### Step 4: Access the Application

1. Open your browser and go to: **`http://localhost:3000`**
2. You should see the Exoplanet Explorer dashboard
3. Navigate to "Upload Data" to test the ML classification features

## ✅ Verification

To verify everything is working:

1. **Backend Health Check**: Visit `http://localhost:8000/health` - should return `{"status": "healthy"}`
2. **Frontend Loading**: Visit `http://localhost:3000` - should show the dashboard
3. **API Integration**: Go to Upload Data page and try selecting a model from the dropdown

## ⚠️ Troubleshooting

**If the frontend can't connect to the API:**
1. Make sure both terminals are running
2. Check that the Python API is on port 8000
3. Verify no firewall is blocking the connection

**If Python packages fail to install:**
```bash
# Try using a virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
```

**If npm install fails:**
```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

## � Technical Details

### Project Structure
```
exoplanet-/
├── app/                    # Next.js pages
│   ├── dashboard/          # Main dashboard
│   ├── upload-data/        # Data upload & classification
│   └── ...
├── lib/                    # API client & utilities
├── nasa-space-apps-api/   # Python FastAPI backend
│   ├── src/main.py        # API server
│   ├── requirements.txt   # Python dependencies
│   └── models/            # ML models
├── components/            # React UI components
├── package.json           # Node.js dependencies
└── README.md              # This file
```

### Features
- **CSV Upload**: Upload exoplanet data files for batch classification
- **Manual Input**: Enter individual exoplanet parameters
- **Multiple ML Models**: Random Forest, XGBoost, Decision Tree
- **Real-time Predictions**: Instant classification results
- **Data Visualization**: Interactive scatter plots and statistics
- **Model Performance**: View accuracy, precision, recall metrics

### API Endpoints
- `POST /api/predict` - Classify exoplanet data
- `GET /api/models` - Get available ML models  
- `GET /api/dashboard` - Get dashboard data
- `GET /api/model-performance` - Model metrics
- `GET /health` - Health check

## 🌟 Usage

1. **Dashboard**: View overall statistics and data visualizations
2. **Upload Data**: 
   - Select an ML model from the dropdown
   - Upload CSV file or enter data manually
   - View classification results and confidence scores
3. **Model Performance**: Check accuracy metrics for different models

## 📁 Sample Data Format

For CSV uploads, use this format:
```csv
orbital_period,transit_duration,planet_radius_earth,transit_depth
3.14,2.5,1.2,150
365.25,6.2,0.8,89
```

---

**Need help?** Check the API documentation at `http://localhost:8000/docs` when the backend is running.
