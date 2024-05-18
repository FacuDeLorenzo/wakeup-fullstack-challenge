# wakeup-fullstack-challenge
Solution to a fullstack challenge by wakeup labs.

Developed using Node v21.7.3

Packages are managed using pnpm!
Make sure you have it installed :)
```
npm install -g pnpm
```

Every resource is usable through pnpm script,
install every dependency before giving them a try
```
pnpm i
```

To debug locally front & api altogether you will need to install concurrently
```
npm install -g concurrently
```

and build the api (it uses bash commands such as rm -rf and cp)
```
pnpm build:api
```

then, to invoke use the *pnpm script* or the debug & run vscode function: *Debug challenge!*
```
pnpm dev:frontapi
```

So as to be able to run the API you must first get the AWS SAM CLI because it's a Serverless API achieved through AWS API Gateway.

Get the latest version of AWS SAM CLI from here
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

Front is deployed at
http://wakeup-fullstack-challenge.s3-website-us-east-1.amazonaws.com/

Api is deployed at
https://n6nzscrpv7.execute-api.us-east-1.amazonaws.com/Prod

Tests for the backend were not implemented.
If they were to be implemented, I'd use jest.
I'd write a test for every lambda handler, so as to check that they can handle recieving wrong parameters, and also to ensure that they get their job done as it's meant to be, which is important to keep the business rules working rightfully.

For the db i was on my way to implement dynamo but run out of time
(Friday 6pm)

I'll try to make it work for monday :)

