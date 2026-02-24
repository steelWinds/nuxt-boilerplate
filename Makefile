IMAGE_NAME                ?= my-nuxt-app
VERSION                   ?= 1.0.0
HOST_PORT                 ?= 3000
CONTAINER_PORT            ?= 3000

# App vars
NODE_ENV                  ?= production
OWN_SW                    ?= true

# Full name of image
IMAGE = $(IMAGE_NAME):${VERSION}

# Load .env file
ifneq (,$(wildcard .env))
    include .env
    export
endif

.PHONY: help build push run stop clean login

help:
	@echo Commands:
	@echo ---------------------------------------
	@echo   build   - Build Docker Image
	@echo   run     - Up container
	@echo   stop    - Stop and delete container
	@echo ---------------------------------------

# Commands
build:
	@echo "Build Docker Image $(IMAGE)..."
	docker build --build-arg NODE_ENV=$(NODE_ENV) --build-arg OWN_SW=$(OWN_SW) -t $(IMAGE) .
	@echo "Image is build: $(IMAGE)"

run:
	@echo "Run Docker Image - $(IMAGE) on port $(HOST_PORT):$(CONTAINER_PORT)..."
	docker run --env-file .env -d -p $(HOST_PORT):$(CONTAINER_PORT) --name $(IMAGE_NAME) $(IMAGE)
	@echo "Docker container is running, name: $(IMAGE_NAME), port: $(HOST_PORT)"

stop:
	@echo "Stop container $(IMAGE_NAME)..."
	-docker stop $(IMAGE_NAME)
	-docker rm $(IMAGE_NAME)
	@echo "Conainer successfully stopped and deleted"
