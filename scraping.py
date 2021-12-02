import requests
from bs4 import BeautifulSoup
url = "http://localhost:3100/final"


r = requests.get(url)
htmlContent = r.content

soup = BeautifulSoup(htmlContent,'html.parser')

print(soup)