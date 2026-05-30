# Architecture Summary

## Frontend

Next.js dashboard rendering:

- KPI Metrics
- Severity Analytics
- Sector Analytics
- Timeline Analytics
- Intelligence Sidebar
- Incident Log

## Backend

FastAPI provides:

- /api/metrics
- /api/analytics
- /api/incidents
- /api/download

## Intelligence Layer

Transforms raw incident data into:

- Most targeted sector
- Dominant severity
- Peak incident month
- Risk assessment
- Executive intelligence summary

## Data Layer

Current:
- Synthetic incident dataset

Future:
- SEC EDGAR
- GDELT integration