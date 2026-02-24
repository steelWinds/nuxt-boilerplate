IMAGE_NAME                ?= my-nuxt-app
VERSION                   ?= 1.0.0
HOST_PORT                 ?= 3000
CONTAINER_PORT            ?= 3000

# App vars
NODE_ENV                  ?= production
OWN_SW                    ?= true

# Full name of image
IMAGE = $(IMAGE_NAME):$(VERSION)

# Load .env file
ifneq (,$(wildcard .env))
    include .env
    export
endif

.PHONY: help build run stop clean

help:
	@echo "Commands:"
	@echo "---------------------------------------"
	@echo "  build   - Build Docker Image"
	@echo "  run     - Run container (stops old one if exists, builds if missing)"
	@echo "  stop    - Stop and remove container"
	@echo "  clean   - Remove built image"
	@echo "---------------------------------------"

build:
	@echo "Building Docker Image $(IMAGE)..."
	docker build \
		--build-arg NODE_ENV=$(NODE_ENV) \
		--build-arg OWN_SW=$(OWN_SW) \
		-t $(IMAGE) .
	@echo "Image built: $(IMAGE)"

run: build
	@echo "Stopping old container if exists..."
	-docker stop $(IMAGE_NAME)
	-docker rm $(IMAGE_NAME)
	@echo "Starting new container from $(IMAGE) on port $(HOST_PORT):$(CONTAINER_PORT)..."
	docker run --env-file .env -d \
		-p $(HOST_PORT):$(CONTAINER_PORT) \
		--name $(IMAGE_NAME) \
		-e NITRO_PORT=$(CONTAINER_PORT) \
		$(IMAGE)
	@echo "Container '$(IMAGE_NAME)' is running, mapped port $(HOST_PORT) -> $(CONTAINER_PORT)"

stop:
	@echo "Stopping container $(IMAGE_NAME)..."
	-docker stop $(IMAGE_NAME)
	-docker rm $(IMAGE_NAME)
	@echo "Container stopped and removed"

clean:
	@echo "Removing image $(IMAGE)..."
	-docker rmi $(IMAGE)
	@echo "Image removed"
