#!make
include .env
export $(shell sed 's/=.*//' .env)

START = docker-compose -f docker-compose.yml up -d
STOP = docker-compose -f docker-compose.yml stop
LOGS = docker-compose -f docker-compose.yml logs --tail=100 -f
STATUS = docker-compose -f docker-compose.yml ps

create-docker-network:
	@echo "\n\033[0;33m Create network...\033[0m"
	@docker network create ${DOCKER_NETWORK}

up:
	@echo "\n\033[1;m Spinning up containers for environment... \033[0m"
	@$(START)
	@$(MAKE) --no-print-directory status

down:
	@echo "\n\033[1;m Removing containers for environment... \033[0m"
	@docker-compose down
	@$(MAKE) --no-print-directory status

stop:
	@echo "\n\033[1;m Halting containers... \033[0m"
	@$(STOP)
	@$(MAKE) --no-print-directory status

restart:
	@echo "\n\033[1;m Restarting containers... \033[0m"
	@$(MAKE) --no-print-directory stop
	@$(START)
	@$(MAKE) --no-print-directory status

status:
	@echo "\n\033[1;m Containers statuses \033[0m"
	@$(STATUS)


logs-backend:
logs-frontend:
logs-%:
	$(LOGS) $*