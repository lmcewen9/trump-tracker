FROM python:3.9
MAINTAINER Luke McEwen

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY trump_tracker_api.py .

EXPOSE 5000

ENTRYPOINT ["python3", "trump_tracker_api.py"]
