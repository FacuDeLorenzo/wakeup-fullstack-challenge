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

and build the api (it uses bash comamnds such as rm -rf and cp)
```
pnpm build:api
```

then, to invoke use the *pnpm script* or the debug & run vscode function: *Debug challenge!*
```
pnpm dev:frontapi
```

So as to be able to run the API you must first get the AWS SAM CLI because it's a Serverless API achieved through AWS API Gateway.

Get the lates version of AWS SAM CLI from here
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html