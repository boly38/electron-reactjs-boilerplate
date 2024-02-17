# electron-reactjs-boilerplate

## Object
- give a ready to use stack of 
    - ReactJS front-end, 
    - electron-based `.exe` packaging
    - API and service based backend using node-dependency-injection
- note that if you want to use Typescript based boilerplate, 
  your could checkout [electron-react-boilerplate/electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)


## Usage
### install

To start only one time
````
git clone https://github.com/boly38/electron-reactjs-boilerplate.git
cd electron-reactjs-boilerplate
npm install && cd front-end && npm install && cd ..
````

### dev
- run this to develop front-end:
````
 npm run dev:front-end
 npm run start-from-src
 # dont use app but your browser and open http://localhost:3000
````

- run this to build front-end and check executable app with it:
````
 npm run start
````

- run this to re-run executable app without change on front-end (suppose you've built it in the past):
````
 npm run start-from-src
````
### test
````
 npm run test
````

### package
- run this to build an executable and setup package:
````
 npm run package
````

### reminder
In order to get tips: the way to unpack asar content, get last exe, get last setup. 
````
 npm run howto:unpack-binary
 npm run howto:run_unpacked_exe
 npm run howto:run_setup
````

## FAQ

- why the executable size is so huge (~80/100MB) ?

IDK exactly but electron embeds chromium and there is some cost related to this statement.

- does exist alternative to electron to package a RectactJS application ?

Sure but there is a need to validate them: [pkg](https://github.com/vercel/pkg) (archived) - [NodeJS 21 single executable application](https://nodejs.org/api/single-executable-applications.html) - [nwjs](https://github.com/nwjs/nw.js) and probably more...


## Contribute

You're welcome to push PR, questions or issue. Dont hesitate to be critic on existing content if you could suggest better.