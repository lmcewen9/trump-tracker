FROM python:3.9
MAINTAINER Luke McEwen

RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "/app/trump_tracker_api.py"]
