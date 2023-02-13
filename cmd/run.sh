docker pull jorotodorov/video-streaming-app:latest
docker pull jorotodorov/video-streaming-server:latest

docker stop video-streaming-server
docker rm video-streaming-server

docker stop video-streaming-app
docker rm video-streaming-app

docker run -d --name video-streaming-server -p 3000:3000 jorotodorov/video-streaming-server:latest
docker run -d --name video-streaming-app -p 3001:80 jorotodorov/video-streaming-app:latest