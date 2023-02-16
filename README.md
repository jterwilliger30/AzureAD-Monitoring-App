# Docker Image Build
docker build -t its_app:latest  .      

# Run Image in Container
docker run -d -p 3000:80 its_app:latest