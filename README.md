# todolist-server

* docker-compose.yml 两个注意点:
  * environment variables的设置
  * mysql image的使用,尤其是加载volumes时,mysql image在spin-up成container之后会找`/docker-entrypoint-initdb.d/`目录下面的.sql文件运行从而初始化db,所以把项目根目录下的`./schame`文件夹映射过去

```javascript
todolist-server:
  build: .
  links:
   - mysql
  ports:
    - "3000:3000"
  volumes:
    - .:/usr/src/app/
  environment:
    NODE_ENV: "development"
    DATABASE_HOST: "mysql"
    DATABASE_USER: "root"
    DATABASE_PASSWORD: "password"
    DATABASE: "todoApp"
  working_dir: "/usr/src/app"
  entrypoint: /usr/src/app/node_modules/nodemon/bin/nodemon.js -L --ignore node_modules/ --ignore public/ --ignore .tmp/ /usr/src/app/app.js
mysql:
  image: mysql
  environment:
    MYSQL_ROOT_PASSWORD: "password"
  volumes:
    - "./schema:/docker-entrypoint-initdb.d/"
  ports:
    - "3306:3306"
```

* db.js文件用expose出来的environment variables来连接db,并用了`mysql-promise`这个module
```javascript
var db = require('mysql-promise')();

var conf = {
  "host": process.env.DATABASE_HOST,
  "user": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PASSWORD,
  "database": process.env.DATABASE
};

console.log ("connecting to ", conf);

db.configure(conf);

module.exports = db;
```

* 为了让todolist-client可以make request,todolist-server需要支持CORS

```javascript
...
var cors = require('koa-cors');
...
app.use(cors({
	origin: '*',
	methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS'
}));
```

* 清除之前运行的container(比如重置mysql一些config之后要运行这个,否则貌似可能restart之前的container)
docker-compose rm -v
