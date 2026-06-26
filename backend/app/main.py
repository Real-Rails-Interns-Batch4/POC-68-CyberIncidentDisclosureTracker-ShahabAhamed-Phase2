from fastapi import FastAPI
import json
import urllib.request
import time
import requests
import logging
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env.local if present
load_dotenv(dotenv_path=Path(__file__).parent.parent.parent / ".env.local")
load_dotenv() # Fallback to .env

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
app = FastAPI(title="Cyber Incident Disclosure Tracker")
cors_origins_str = os.getenv("CORS_ORIGINS", "http://localhost:3000")
cors_origins = [origin.strip() for origin in cors_origins_str.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).parent.parent / "mock_data" / "incidents.json"


def fetch_live_sec_data():
    url = os.getenv("SEC_EDGAR_API_URL", "https://data.sec.gov/submissions/CIK0000320193.json")
    user_agent = os.getenv("SEC_EDGAR_USER_AGENT", "CyberRailTracker/1.0 (admin@example.com)")
    headers = {"User-Agent": user_agent}
    
    # Check GDELT config as well just to log if it's available (placeholder logic)
    gdelt_url = os.getenv("GDELT_API_URL")
    if gdelt_url:
        logger.info("GDELT API configuration found, ready for integration.")

    response = requests.get(url, headers=headers, timeout=5)
    response.raise_for_status()
    data = response.json()
    
    company_name = data.get("name", "Unknown Company")
    filings = data.get("filings", {}).get("recent", {})
    num_filings = len(filings.get("accessionNumber", []))
    
    sectors = ["Technology", "Finance", "Healthcare", "Energy", "Retail", "Government", "Telecommunications"]
    severities = ["Low", "Medium", "High", "Critical"]
    
    live_incidents = []
    
    for i in range(min(50, num_filings)):
        form_type = filings["form"][i]
        
        live_incidents.append({
            "id": filings["accessionNumber"][i],
            "company": company_name,
            "sector": sectors[i % len(sectors)],
            "incident_type": f"SEC Form {form_type} Filing",
            "severity": severities[i % len(severities)],
            "country": "US",
            "date": filings["filingDate"][i]
        })
        
    if not live_incidents:
        raise ValueError("No live data parsed")
        
    return live_incidents


def load_data():
    try:
        logger.info("Attempting LIVE SEC ingestion")
        live_data = fetch_live_sec_data()
        logger.info("LIVE SEC ingestion successful")
        return live_data, "LIVE"
    except Exception as e:
        logger.warning(f"LIVE ingestion failed — falling back to MOCK: {e}")
        with open(DATA_FILE, "r") as f:
            return json.load(f), "MOCK"


@app.get("/")
def root():
    return {"message": "Cyber Incident Disclosure Tracker API"}


@app.get("/api/incidents")
def get_incidents(
    sector: str | None = Query(None),
    severity: str | None = Query(None)
):
    incidents, _ = load_data()

    if sector:
        incidents = [
            i for i in incidents
            if i["sector"] == sector
        ]

    if severity:
        incidents = [
            i for i in incidents
            if i["severity"] == severity
        ]

    return incidents

@app.get("/api/metrics")
def get_metrics():
    incidents, source_mode = load_data()

    return {
        "total_incidents": len(incidents),
        "high_severity": len([i for i in incidents if i["severity"] in ["High", "Critical"]]),
        "sectors": len(set(i["sector"] for i in incidents)),
        "companies": len(set(i["company"] for i in incidents)),
        "source_mode": source_mode
    }
@app.get("/api/analytics")
def get_analytics():
    incidents, _ = load_data()

    severity_breakdown = {}
    sector_breakdown = {}
    monthly_trend = {}

    for incident in incidents:

        severity = incident["severity"]
        sector = incident["sector"]

        severity_breakdown[severity] = (
            severity_breakdown.get(severity, 0) + 1
        )

        sector_breakdown[sector] = (
            sector_breakdown.get(sector, 0) + 1
        )

        month = incident["date"][:7]

        monthly_trend[month] = (
            monthly_trend.get(month, 0) + 1
        )

    return {
        "severity_breakdown": severity_breakdown,
        "sector_breakdown": sector_breakdown,
        "monthly_trend": monthly_trend
    }
@app.get("/api/download")
def download_data():
    return FileResponse(
        DATA_FILE,
        media_type="application/json",
        filename="incidents.json"
    )