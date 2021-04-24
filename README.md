## API for [Health Care App](https://github.com/San0330/Health-Care-App)

### Prerequisties

- NodeJS
- MongoDB

### Installation

- clone or download the project
- create a file named 'config.env' inside project & copy .env.example into it
- set the variables inside config.env, also set the DB name after creating it in mongoDB
- run the following commands
  ```
  npm install
  node dev-data/scripts.js --importproduct
  node dev-data/scripts.js --importcategory
  node dev-data/scripts.js --importusers
  ```
- above commands will download the npm packages & also fill the database with necessary data
- the email for admin is admin@gmail.com & password is password, you can check the json file dev-data/users.json for more info
- use `npm start` or `npm run dev` to start the server

## Resources

- Any docs or videos from Google & Youtube is enough.
- Udemy course of NodeJS from Jonas.io, is preferred by me, as it is more focused on Rest API.
