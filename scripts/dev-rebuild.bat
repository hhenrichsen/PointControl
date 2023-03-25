@echo off
docker-compose -f devops/docker-compose-dev.yml -p app up --build -d %*