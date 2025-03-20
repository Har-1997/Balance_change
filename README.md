## Overview
This project is a Node.js application written in Express.js and PostgreSQL with sequelize(uzumg) which automatically creates db and adds user table through migration, also created one user with 10000 balance and we need to send multiple requests at once to reduce the balance. we can do this using autocannon testing tool and you can run it and see how the application works with multiple requests.


## Features
 .Create DB.
 .Create users table with migration and add default user with balance 10000.
 .Each time uses the query and decreases the balance by 2 until the balance reaches a number that is less than 0.
 .there is autocannon for testing can run it.


## All configuration you can find:
- package.json
- config/uzumg.js
- config/sequilize.js
- example.env


## Running the Application:
For development:
```bash or ...
  npm run dev
```

To run the application in production mode:
```bash or ...
  npm start
```

To test with thousands of queries:
```bash or ...
  npm run load-test
```
