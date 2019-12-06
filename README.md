## Facebook wall feeds with passport-facebook authentication

This is a Node.js, Express.js and Passport.js Facebook feeds API, with authenticate users using Facebook account.

## Instructions

```bash
  $ git clone https://github.com/andy-ferdian/fb-wall-feeds-api.git
  $ cd fb-wall-feeds-api
  $ npm install
```

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.

```bash
  Use this:

  FACEBOOK_CLIENT_ID=589814961872434
  FACEBOOK_CLIENT_SECRET=eaf7473d4ec88339ede64be87f3eafc8

```

Run the server.

```bash
  $ npm run start # Runs on http://localhost:5000
```

## User login page [/login]

Go to browser page:

```bash
  http://localhost:5000/login
```

follow login with facebook,

```
  username: inazrabuu@hotmail.com
  password:  #Pa55w0rd#
```

## User profile page [/profile]

After successfully login with facebook, we can get userid and user display at this url:

```bash
  http://localhost:5000/profile
```

## User feeds page / API access [/user-feeds/:userid]

User feeds API can be access with this endpoint,

or click link 'See your FB feeds' to see the user facebook feeds.

```bash
  http://localhost:5000/user-feeds/10157154298488547
```

Pagination also provided in the response of this end point.

## User logout [/logout]

```bash
  http://localhost:5000/logout
```

to log out the user
