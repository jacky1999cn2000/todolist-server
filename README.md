# todolist-server

* node-inspector
  * 安装node-inspector(注意有坑啊)
    * Encountered this error when trying to make node-inspector to work `Error: Cannot find module '/usr/src/app/node_modules/node-inspector/node_modules/v8-debug/build/debug/v0.7.7/node-v47-linux-x64/debug.node`, then I realized the problem is because I run `npm install` directly on my Mac, but when the code running in docker container, it looks for linux version of node-inspector! I then deleted `node_modules` folder and run `make run` directly, and everything works fine. `make run` will first run `docker run -i --rm --name install -v 'pwd':/usr/src/app -w /usr/src/app node:5 npm install`, then there is a subtle difference since this time `npm install` was run in VM, a linux machine, so correct version of node-inspector was installed. Really tricky~ :wink:
  * docker-compose.yml文件

    ```javascript
     ...
      ports:
        - "3000:3000"
        - "3344:3344"
        - "8989:8989"
        - "5858:5858"
     ...
     entrypoint: "bin/debug.sh"
     ...
    ```
   * debug.sh文件

   ```javascript
    #!/bin/sh
    node_modules/.bin/node-inspector --web-port=8989 --debug-port=3344 --preload=false & node_modules/.bin/nodemon --debug -L --ignore node_modules/ --ignore tests/ app.js
   ```
   * Makefile

   ```javascript
   clean:
   	echo "clean"

   install: clean
   	docker run -i --rm --name install -v `pwd`:/usr/src/app -w /usr/src/app node:5 npm install

   run: install
   	docker-compose down
   	docker-compose up

   ```

   * 去 http://192.168.99.100:8989/?port=5858

   * 其他资料
     * [how to use node-inspector to debug node applications](http://kurtle.io/2015/11/01/how-to-set-up-node-inspector.html)
     * 本项目里的NODE-INSPECT.md(在此基础上做了修改，这个是kasey的版本)

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
