
# My first E-Commerce website


  

## Getting Started

  

First step is to install the dependencies

Server `Path: /mern-ecommerce`

`$ npm install`

Client `Path: /mern-ecommerce/client`

`$ npm install`

  

Also you need to cretae your own config.env and default.json file in `/mern-ecommerce/config`, here is the template and content you need to have
1. config.env   `/mern-ecommerce/config/config.env`
```
NODE_ENV=development
PORT=5000
MONGO_URI= <Your MongoDB uri>
```
2.   default.json `/mern-ecommerce/config/default.json`
 ```
{
"ACCESS_JWT_TOKEN_SECRET": <Your Access Token Secert>,
"REFRESH_JWT_TOKEN_SECRET": <Your Refresh Token Secert>"
}
```
  
  

After that you need to return to `/mern-ecommerce` to start both server and client by typing <br/>`$ npm run dev` .

  

## FAQ

  

- Objective ? 
	- This project is a pratice for me to learn modern framework and webapp.

- What have you learned in this project ?
	-	OAuth 2.0, JWT token, RESTful API, NoSQL database (MongoDB), MVC Pattern, ReactJS, Redux, ExpressJS, NodeJS, TypeScript, Bootstrap, Material-UI etc...