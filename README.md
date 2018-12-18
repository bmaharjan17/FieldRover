#FieldRover


> A Node.js web application that helps with finding, reviewing sports venue for local communities

## Disclaimer

> This is a beta version of the web application used for strictly academic purposes. 
> Few of the environment and keys deliberately hidden to protect the author's privacy. 
> However, feel free to clone this repository if needed.

## Live Demo

> Coming Soon

## Features

* Authentication:
  
  * User login with username and password



* Authorization:

  * Users cannot manage posts and view user profile without being authenticated

  * Users cannot edit or delete posts and comments created by other users



* Manage Field posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Flash messages responding to users' interaction with the app
  
  * Location service with the help of google map APIs
  
  * Peform custom keyword searches of the existing grounds 



* Responsive web design
  
* Blackground-Slider for the landing page



### Custom Enhancements

> Coming soon 

### Install dependencies

```sh
npm install
```

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Google Maps APIs](https://developers.google.com/maps/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)   -Node.js framework

* [mongoDB](https://www.mongodb.com/)	-cloud deployment & op

* [mongoose](http://mongoosejs.com/)	-object modeling for mongodb for node.js

* [passport](http://www.passportjs.org/) -authentication middleware for Node.js

* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)

* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)	-Flash message middleware for Connect and Express

### Platforms

* [Heroku](https://www.heroku.com/)		-cloud hosting

* [Cloud9](https://aws.amazon.com/cloud9/?origin=c9io)  -cloud ide