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

Set config 

```
firebase functions:config:set gmail.email="teamdeliverease@gmail.com"
firebase functions:config:set gmail.password=<ASK_FOR_PASSWORD>
```

Store config locally 

```
firebase functions:config:get > .runtimeconfig.json
```

Start the firebase local server

```
npm run start
```

Check out the project at `http://localhost:5000`
Check out the database at `http://localhost:9000/volunteers.json?ns=deliverease-staging`

### Contributing
1) checkout and pull master: `git checkout master && git pull`
2) create a branch: `git checkout -b <branch_name>`
3) commit to branch: `git commit -m "<commit_message>`
4) push branch: `git push --set-upstream origin <branch_name>`
5) create a pr to master (I find it easy to do on github.com) and assign reviewers
6) once pr is merged, delete remote branch (also easy to do on github.com)
7) checkout and pull master: `git checkout master && git pull`
8) delete local branch: `git branch -d <branch_name>`
9) prune deleted branches: `git prune`
