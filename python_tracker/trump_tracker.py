from os import getenv
from bs4 import BeautifulSoup
import requests
from re import split

def grap_favorable():
    req = requests.get("https://elections2024.thehill.com/national/trump-favorability-rating/").text
    soup = BeautifulSoup(req, "html.parser")
    polls = []
    [polls.append(poll) for poll in split("Favorable|% |Unfavorable", soup.find_all(class_="mb-2 hidden md:block")[0].text) if poll != '']
    return polls

def grab_commodities(url):
    req = requests.get("https://fred.stlouisfed.org/series/APU000074714").text
    soup = BeautifulSoup(req, "html.parser")
    price = soup.find(class_="series-meta-observation-value").text
    return price

def main():
    polls = grap_favorable()
    eggs = grab_commodities("https://fred.stlouisfed.org/series/APU0000708111")
    gas = grab_commodities("https://fred.stlouisfed.org/series/APU000074714")

    url = getenv('URL')
    data = {"date": polls[0], "favorable": polls[1], "unfavorable": polls[2], "eggs": eggs, "gas": gas}
    requests.post(url, json=data)

if __name__ == "__main__":
    main()