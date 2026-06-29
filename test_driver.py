from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
# Uncomment the next line if you want to run without opening a browser
# options.add_argument("--headless=new")

driver = webdriver.Chrome(options=options)

driver.get("https://www.google.com")

print("Title:", driver.title)

driver.quit()