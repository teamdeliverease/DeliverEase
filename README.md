# DeliverEase

We connect helpful volunteers with individuals who have a hard time accessing food and other essentials.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
node > 10: https://nodejs.org/en/download/
```

### Installing

Install firebase cli

```
npm install -g firebase-tools
```

Log in to firebase

```
firebase login
```

Store config locally 

```
firebase functions:config:get > .runtimeconfig.json
```

Get the following files from team members and store them at the root of DeliverEase

```
serviceAccountKey.json
.env.local
```

Install project dependencies
```
npm install
```
### For development where testing db & auth is not required:

Start the nextjs local server

```
npm run dev
```

Check out the project at `http://localhost:3000`

### For development where testing db & auth is required:

Start the firebase emulator

```
npm start
```

Check out the project at `http://localhost:5000`

Check out the database at `http://localhost:9000/path/to/data.json?ns=deliverease-staging`


### Deployment

Use the following npm scripts to deploy hosting and functions to firebase
```
npm run deploy
npm run deploy:prod -- -m "deployment message"
```

🚨 Only run `deploy-prod` with approval of all team members 🚨

### Adding admin users

Use the grant-admin and revoke admin scripts with a user's email to grant/revoke permissions
Example:
```
grant-admin matt@gmail.com
revoke-admin felix@gmail.com
```

### Contributing
1) checkout and pull master: `git checkout master && git pull`
2) create a branch: `git checkout -b <branch_name>`
3) commit to branch: `git commit -m "<commit_message>`
4) push branch: `git push --set-upstream origin <branch_name>`
5) create a pr to master (I find it easy to do on github.com) and assign reviewers
6) once pr is merged, delete remote branch (also easy to do on github.com)
7) checkout and pull master: `git checkout master && git pull`
8) delete local branch: `git branch -d <branch_name>`
9) prune deleted branches: `git remote prune origin`

### npm scripts reference
`dev`: for UI development (runs next, hot reloading, but no firebase db/auth - runs on port 3000)
`start`: for testing UI + firebase (runs firebase emulators, no hot reloading - runs on port 5000)
`test`: for running our database rules tests (and more eventually)
`deploy`: for deploying to staging
`deploy:prod`: for deploying to production
