### The Old-Fashioned...
```javascript
console.log('here');  
console.log('here 2');  
console.log('dammit...');  
```

We've all done that.  But, there's a better way.  Enter Node-Inspector, an interface into the standard node debug mode that allows you to debug Node applications using Chrome's devtools.  So, you can debug your node application just like you would a front-end application.

Let's dive right in...

### 1. Docker Setup

Given that we run many of our node applications inside docker containers, we need to first make sure that the appropriate ports (3344 and 8989) are opened in our docker-compose.yml (or equivalent) file, and that the "DEBUG" environment variable is set..

```javascript
my-awesome-node-api:  
  build: .  
  ports:  
    - "80:1337"  
    - "3344:3344"  
    - "8989:8989"  
  volumes:  
    - "./:/app/src"  
  environment:  
    NODE_ENV: "local"  
    DEBUG: "true"  
  entrypoint: "/app/src/run-local.sh"  
```

### 1b. Run-Local.sh Setup

After our environment variables are set, and the ports are mapped, we can conditionally start our application in debug mode...

```javascript
#!/usr/bin/env bash  
if [ "$DEBUG" = "true" ]; then  
    npm install -g node-inspector  
fi  
npm install  
env  

if [ "$DEBUG" = "true" ]; then  
    node-inspector --web-port=8989 --debug-port=3344 --preload=false & nodemon --debug ./app.js  
else  
    nodemon -L --ignore node_modules/ --ignore public/ --ignore .tmp/  app.js --${NODE_ENV}  
fi  
```

What this will do is launch two processes:
  * the actual node application in debug mode
  * node-inspector, which allows us to debug using chrome
    * the preload flag set to "false" speeds up startup time by not preloading all the JS up front...

### 2. Start your docker container...

When the application starts, you'll see something like...
```javascript
Visit http://127.0.0.1:8989/?port=3344 to start debugging.  
```
Sweet molasses - that means that we're ready to debug!

__Note__: (ignore any errors you see about port 5858...it doesn't seem to be an actual problem).


### 3. Fire up Chrome and start debugging!
If this were running on your local machine and not inside a Docker container, the above URL would work, but since we're inside of a little sandbox, we have to do things differently.  Instead of using 127.0.0.1, we need to use the IP address of your container, which you can get by running:

```javascript
#this assumes that "default" is the name of your container  
docker-machine ip default  
```

* For the sake of example, I'll launch up http://192.168.99.100:8989/?port=5858.
  * You should see the familiar Chrome debugger interface.
* Now comes the fun part...wait 60 seconds (if the preload flag is not set).
  * For some reason, node-inspector takes about 30  seconds to fully crawl your application and get it ready to debug...but it's all worth it.
* Click on the "sources" tab at the top.
  * You should see all the files in your application!
* Put a breakpoint somewhere and refresh your application or do something that should trigger that code.  Execution should be paused, and you can view the entire stack.  Magic.


![node-debug](/imgs/node-debug.gif?raw=true "node-debug")
