docker login

docker build -f ../server/Dockerfile -t jorotodorov/video-streaming-server .
docker push jorotodorov/video-streaming-server

docker build -f ../client/Dockerfile -t jorotodorov/video-streaming-app .
docker push jorotodorov/video-streaming-app