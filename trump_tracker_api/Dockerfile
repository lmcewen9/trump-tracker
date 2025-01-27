FROM python:3.11
LABEL Luke McEwen

ADD . .
RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "/trump_tracker_api.py"]
