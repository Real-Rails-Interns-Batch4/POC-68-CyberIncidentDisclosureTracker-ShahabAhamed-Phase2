from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import requests

# ==============================
# Configuration
# ==============================

FRONTEND_URL = "https://poc68-frontend.salmonbush-80aaf7cc.southeastasia.azurecontainerapps.io"

BACKEND_URL = "https://poc68-backend.salmonbush-80aaf7cc.southeastasia.azurecontainerapps.io/api/incidents"

# ==============================
# Start Browser
# ==============================

driver = webdriver.Chrome()
driver.maximize_window()

results = []


def record(test, passed):
    status = "PASS" if passed else "FAIL"
    results.append(f"{test}: {status}")
    print(f"{test}: {status}")


try:

    # =====================================================
    # Test 1 - Open Azure Frontend
    # =====================================================

    driver.get(FRONTEND_URL)

    WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.TAG_NAME, "body"))
    )

    record("Page Load", True)

    # =====================================================
    # Test 2 - Browser Title
    # =====================================================

    record("Title Present", driver.title != "")

    # =====================================================
    # Test 3 - Backend API
    # =====================================================

    try:
        response = requests.get(BACKEND_URL, timeout=20)

        record("Backend API", response.status_code == 200)

    except Exception:
        record("Backend API", False)

    # =====================================================
    # Test 4 - Wait for Loading Screen to Finish
    # =====================================================

    try:
        WebDriverWait(driver, 30).until_not(
            EC.presence_of_element_located(
                (
                    By.XPATH,
                    "//*[contains(text(),'Initializing Intelligence Feed')]"
                )
            )
        )

        record("Loading Completed", True)

    except Exception:
        record("Loading Completed", False)

    # =====================================================
    # Test 5 - Dashboard Heading
    # =====================================================

    try:

        heading = WebDriverWait(driver, 30).until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//*[contains(text(),'Cyber Incident Disclosure Tracker')]"
                )
            )
        )

        record("Dashboard Loaded", heading.is_displayed())

    except Exception:

        record("Dashboard Loaded", False)

    # =====================================================
    # Test 6 - KPI Card
    # =====================================================

    try:

        kpi = WebDriverWait(driver, 30).until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "//*[contains(text(),'Total Incidents')]"
                )
            )
        )

        record("Metrics Loaded", kpi.is_displayed())

    except Exception:

        record("Metrics Loaded", False)

except Exception as e:

    print(e)
    record("Application Available", False)

finally:

    with open("Test_Report.txt", "w") as report:

        report.write("POC-68 Selenium Test Report\n")
        report.write(f"Generated: {datetime.now()}\n\n")

        for item in results:
            report.write(item + "\n")

    driver.save_screenshot("selenium_result.png")

    driver.quit()

print("\n====================================")
print("Testing Completed")
print("====================================")
print("Generated Files:")
print("1. Test_Report.txt")
print("2. selenium_result.png")