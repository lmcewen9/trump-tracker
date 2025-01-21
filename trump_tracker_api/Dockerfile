FROM python:3.9
MAINTAINER Luke McEwen

COPY . .
RUN pip3 install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python3", "trump_tracker_api.py"]
