FROM --platform=linux/arm/v5 python:3.11 as build
MAINTAINER Luke McEwen

ADD . .
RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "/trump_tracker_api.py"]
