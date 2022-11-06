docker stop video-streaming-app
docker rm video-streaming-app

docker pull jorotodorov/video-streaming-app:latest
docker run -d --name video-streaming-app -p 3001:80 jorotodorov/video-streaming-app:latest