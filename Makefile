DOCKER_OPTS ?= --rm

# TEST_ARGS = -v | grep -c RUN
VERSION := $(shell git describe --tags --abbrev=0)

help:
	@echo "Service building targets"
	@echo "  docker: build docker container for web-app"
	@echo "Env:"
	@echo "  DOCKER_OPTS : default docker build options (default : $(DOCKER_OPTS))"

docker:
	docker build -t  grippenetch/participant-webapp:$(VERSION)  -f Dockerfile $(DOCKER_OPTS) .

docker-minikube:
	docker build -t  grippenetch/participant-webapp:$(VERSION)-minikube  -f Dockerfile $(DOCKER_OPTS) --build-arg ENV_PRODUCTION_LOCAL=.env.production.local.minikube .
