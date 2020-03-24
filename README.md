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
set googlemaps `api_key` in index.html to `AIzaSyAhjz4PFetOQjeGA8I-sR3ROYDg3Zovlpg`

### Notes

To test google maps api functionality locally, get the local api key from one of the maintainers and replace `key=` in the google maps api import with the local key.
