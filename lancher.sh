
#!/bin/bash
fuser -k 3000/tcp
fuser -k 5000/tcp

service redis_6379 start
cd ./Online-Judge-server
npm install
nodemon server.js &

cd ../Online-Judge-client
npm install
ng build --watch &

cd ../executor
pip install -r requirements.txt
python executor_server.py

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
fuser -k 5000/tcp
service redis_6379 stop