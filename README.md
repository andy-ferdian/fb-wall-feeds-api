## Facebook wall feeds with passport-facebook authentication


This is a Node.js, Express.js and Passport.js Facebook feeds API, with authenticate users using Facebook.

## Instructions

```bash
  $ git clone git@github.com:andy-ferdian/fb-wall-feeds-api.git
  $ cd fb-wall-feeds-api
  $ npm install
```
Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.

```bash
  Example:

  FACEBOOK_CLIENT_ID=589814961872434
  FACEBOOK_CLIENT_SECRET=eaf7473d4ec88339ede64be87f3eafc8

```

Run the server.

```bash
  $ node server.js # Runs on http://localhost:5000
```

## User login page [/login]
Go to browser page:
```bash
  http://localhost:5000/login
```
follow login with facebook
## User  profile page [/profile]

After login with facebook, go to profile page.
```bash
  http://localhost:5000/profile
```
## User  feeds page [/user-feeds/:userid]
Click link 'See your FB feeds' to see the user facebook feeds, or go to:
```bash
  http://localhost:5000/user-feeds/10157154298488547
```
## User  logout [/logout]

  `http://localhost:5000/logout`

  to log out user
