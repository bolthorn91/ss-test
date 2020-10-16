Api to upload files and run a night proccess (actually manually) to create licenses for bikers.

## POST: http://{DOMAIN_URL}/api/uploads
default DOMAIN_URL: localhost:3000
- post to upload a csv file

## csv example
csv headers are: name, license, email
csv separator: ;

name;license;email
user1,license1;sstesttest2020@gmail.com
user2;license2;sstesttest2020@gmail.com
user3;license3;sstesttest2020@gmail.com
user4;license4;sstesttest2020@gmail.com

# npm scripts

## npm i
Always install your dependencies :P.

## npm run set_dev
set dev environment config

## npm run dev
start server in dev mode (nodemon)

## npm run test-cron
Initialize the script to get csv data, proccess data, create pdf licenses and send it to users via email.

## npm run start
set dev conf, transpile js and start server with the previous set config for production (node)
