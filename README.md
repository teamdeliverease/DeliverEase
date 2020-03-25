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

Start the firebase local server

```
firebase serve
```

Check out the project at `http://localhost:5000`

Set googlemaps `api_key` in index.html to `AIzaSyAhjz4PFetOQjeGA8I-sR3ROYDg3Zovlpg`

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

### Notes

To test google maps api functionality locally, put `AIzaSyAhjz4PFetOQjeGA8I-sR3ROYDg3Zovlpg` in the `key=` param in index.html at the bottom where the google maps api is imported.
