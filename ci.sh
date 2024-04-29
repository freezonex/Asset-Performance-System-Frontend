docker build -t benchu0630/next-benchu:latest ./
docker push benchu0630/next-benchu

#使用
#docker pull benchu0630/next-benchu
#docker run --name next-benchu -d -p 3000:3000 benchu0630/next-benchu