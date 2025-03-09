from os import getenv
from bs4 import BeautifulSoup
import requests
from datetime import datetime

def grab_favorable():
    req = requests.get("https://www.realclearpolling.com/polls/approval/donald-trump/approval-rating").text
    soup = BeautifulSoup(req, "html.parser")
    favorable, unfavorable = [favorability.text.replace("%", "") for favorability in soup.find_all(class_="text-h1 min-[1025px]:font-arialc font-hnc leading-none lg:!text-[56px] !text-[40px]")]
    return favorable, unfavorable

def grab_commodities(url):
    req = requests.get(url).text
    soup = BeautifulSoup(req, "html.parser")
    price = soup.find(class_="series-meta-observation-value").text
    return price

def main():
    date = datetime.now().strftime("%m/%d/%y")
    favorable, unfavorable = grab_favorable()
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