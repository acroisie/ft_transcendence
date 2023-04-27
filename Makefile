build-backend:
	cd backend && npm install && npm run build

build-frontend:
	cd frontend && npm install && npm run build

build: build-backend build-frontend

start-dev:
	docker-compose -f docker-compose.yml up --build

# start-prod:
# 	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

stop:
	docker-compose down

clean:
	docker-compose down --rmi all --volumes

re: fclean build

fclean: clean
	cd backend && rm -rf node_modules dist
	cd frontend && rm -rf node_modules dist

.PHONY: build-backend build-frontend build start-dev start-prod stop clean re fclean
