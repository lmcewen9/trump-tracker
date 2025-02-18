from os import getenv
from bs4 import BeautifulSoup
import requests
from re import split

def grap_favorable():
    req = requests.get("https://projects.fivethirtyeight.com/polls/favorability/donald-trump/").text
    soup = BeautifulSoup(req, "html.parser")
    date = soup.find(class_="date").text.replace("Polls \nending \n", "").replace(".", "")
    favorable, unfavorable = [favorability.find(class_="heat-map").text.replace("%", "") for favorability in soup.find_all(class_="value hide-mobile")[:2]]
    return date, favorable, unfavorable

def grab_commodities(url):
    req = requests.get(url).text
    soup = BeautifulSoup(req, "html.parser")
    price = soup.find(class_="series-meta-observation-value").text
    return price

def main():
    date, favorable, unfavorable = grap_favorable()
    eggs = grab_commodities("https://fred.stlouisfed.org/series/APU0000708111")
    gas = grab_commodities("https://fred.stlouisfed.org/series/APU000074714")
    bananas = grab_commodities("https://fred.stlouisfed.org/series/APU0000711211")
    coffee = grab_commodities("https://fred.stlouisfed.org/series/APU0000717311")
    chocolate = grab_commodities("https://fred.stlouisfed.org/series/APU0000702421")

    url = getenv('URL')
    data = {"date": date, "favorable": favorable, "unfavorable": unfavorable, "eggs": eggs, "gas": gas, "bananas": bananas, "coffee": coffee, "chocolate": chocolate}
    requests.post(url, json=data)

if __name__ == "__main__":
    main()