
## Features

| Feature                                                                                               |
|-------------------------------------------------------------------------------------------------------|
| ES6 using [Babel](https://babeljs.io/)                                                                |
| Run tests using [Mocha](https://mochajs.org/)                                                         |
| Code linting using [ESLint](http://eslint.org/)                                                       |
| Automatic syntax formatting using [prettier](https://github.com/prettier/prettier)                    |
| Auto-restart server using [nodemon](https://nodemon.io/)                                              |
| Logging using [debug](https://github.com/visionmedia/debug)                                           |
| HTTP access control using [cors](https://github.com/expressjs/cors)                                   |
| Authorization access control using [node-casbin](https://github.com/casbin/node-casbin)               |
| API parameter validation using [express-validation](https://github.com/andrewkeig/express-validation) |
| Code coverage using [istanbul](https://istanbul.js.org/)                                              |
| HTTP status code and message [http-status](https://github.com/adaltas/node-http-status)               |
| Consistent commit syntax using [commitizen](http://commitizen.github.io/cz-cli/) and [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)  |
| Precommit hook by running the linter and code coverage tool                                           |
| Authentication using [Passport.js](http://passportjs.org/) and [JSON Web Tokens](https://jwt.io/)     |
| Password hashing using [bcryptjs](https://www.npmjs.com/package/bcryptjs)                             |

## Installing / Getting started

Fork the repository.

create a new Branch module_taskId
```shell
git checkout -b auth_task2
```
Once you make the changes then commit the changes and push the updated code

now rasie a PR Request of the changes done.


## Developing the application

To start developing with code linter,

```shell
npm run dev
```

## Add an access to a route for a certain role

Edit the `policy.csv` file in `src/lib/acl/`

Add an entry:

1st column - p

2nd column - sub (role eg. admin)

3rd column - obj (resource or route eg. /users)

4th column - act (method eg. POST, GET, PUT, DELETE)

For more info, read the [casbin documentation.](https://casbin.org/docs/en/overview)


#   b l o g B a c k e n d  
 