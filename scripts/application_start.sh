#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ubuntu/file/ec-2021
sudo chmod -R 777 /home/ubuntu/file/ec-2021/dist

#navigate into our working directory where we have all our github files
cd /home/ubuntu/file/ec-2021

echo "delete docker container & image..."
sudo docker rm -f ec-2021
sudo docker rmi -f lambiengcode/ec-2021:latest

# Build docker image
echo "build docker image..."
sudo docker build -t lambiengcode/ec-2021:latest .

# Run docker container
sudo docker run -d --name ec-2021  -p 3000:3000 --env-file .env lambiengcode/ec-2021