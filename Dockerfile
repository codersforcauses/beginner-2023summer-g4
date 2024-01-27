FROM python:3.8
CMD ["git", "pull", "https://github.com/codersforcauses/beginner-2023summer-g4.git"]
WORKDIR "/pinpoint"
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8080
CMD ["python3", "app/init.py"]
