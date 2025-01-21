FROM python:3.9
MAINTAINER Luke McEwen

ADD . .
RUN pip install -r /requirements.txt

EXPOSE 5000
CMD ["python", "/trump_tracker_api.py"]
