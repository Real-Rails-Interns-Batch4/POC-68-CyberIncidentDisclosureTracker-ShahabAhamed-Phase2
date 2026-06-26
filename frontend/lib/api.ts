const API_URL = "";

export async function getMetrics() {
  const response = await fetch(`${API_URL}/api/metrics`);
  return response.json();
}

export async function getAnalytics() {
  const response = await fetch(`${API_URL}/api/analytics`);
  return response.json();
}
export async function getIncidents(
  sector?: string,
  severity?: string
) {
  let url = `${API_URL}/api/incidents`;

  const params = new URLSearchParams();

  if (sector) params.append("sector", sector);
  if (severity) params.append("severity", severity);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);

  return response.json();
}