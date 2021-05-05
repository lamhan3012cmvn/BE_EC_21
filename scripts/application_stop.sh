#!/bin/bash
#Stopping existing node servers
echo "delete docker container & image..."
sudo docker rm -f ec-2021
sudo docker rmi -f lambiengcode/ec-2021:latest