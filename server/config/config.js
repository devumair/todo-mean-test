var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development:{
    db: 'mongodb://localhost:27017/mean-demo',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production:{
    db: 'mongodb://node:nodeuser1@ds139950.mlab.com:39950/todo-app-db',
    rootPath: rootPath,
    port: process.env.PORT || 80

  },
  testproduction:{
    db: 'mongodb://node:nodeuser1@ds139950.mlab.com:39950/todo-app-db',
    rootPath: rootPath,
    port: process.env.PORT || 8085

  }


}