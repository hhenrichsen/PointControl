@echo off
docker-compose -f devops/docker-compose-dev.yml -p app down -v
rmdir /S /Q data\dev
rmdir /S /Q data\dev-migrations