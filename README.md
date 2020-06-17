

# My first e-commerce webapp

<img src="https://github.com/michaelc285/mern-ecommerce/blob/master/readmeImage/sample1.png?raw=true" width="400">

<img src="https://github.com/michaelc285/mern-ecommerce/blob/master/readmeImage/cartLanding.jpg?raw=true" width="400">

## Getting Started

  
First step is to install the dependencies

Server `Path: /mern-ecommerce`

`$ npm install`

Client `Path: /mern-ecommerce/client`

`$ npm install`

  

Also you need to cretae your own config.env file in `/mern-ecommerce/config`, here are the contents you need to have in
config.env   `/mern-ecommerce/config/config.env`
```
NODE_ENV= <development | production>
PORT= <Port you want>
MONGO_URI= <Your MongoDB uri>
PAYPAL_CLIENT_ID= <Your Paypal Client ID>
ACCESS_JWT_TOKEN_SECRET=<Your Access Token Secert>
REFRESH_JWT_TOKEN_SECRET=<Your Refresh Token Secert>
```
  
  

After that you need to return to `/mern-ecommerce` to start both server and client by typing <br/>`$ npm run dev` .

## About This App 


```
Role
	|- Admin
		|- MyAccount
			|- Cart
			|- History
			|- Profile
			|- Logout
		|- Dashboard
			|- ProductsControlPanel
			|- UsersControlPanel
	|- User
		|- MyAccount
			|- Cart
			|- History
			|- Profile
			|- Logout
	|- Guest
		|- SIGN UP
		|- SIGN IN

```
## FAQ
- Objective ? 
	- This project is a pratice for me to learn modern framework and webapp.

- What have you learned in this project ?
	-	OAuth 2.0, JWT token, RESTful API, NoSQL database (MongoDB Atlas), MVC Pattern, ReactJS, React Hooks, Redux, ExpressJS, NodeJS, TypeScript, Tailwindcss ,Bootstrap, Material-UI etc...
