@echo off
docker-compose -f devops/docker-compose-dev.yml -p app exec backend npm run typeorm -- migration:generate ./src/migrations/%1 -d ./datasource.js
