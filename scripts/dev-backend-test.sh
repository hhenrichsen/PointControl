docker-compose -f devops/docker-compose-dev.yml -p app exec db bash -c "printf '\set AUTOCOMMIT on\ndrop database test; create database test; ' |  psql postgres -U postgres"
docker-compose -f devops/docker-compose-dev.yml -p app exec tests npm test