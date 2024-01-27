FROM python:3.8
WORKDIR "/pinpoint"
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8080
CMD ["python3", "app/init.py"]
