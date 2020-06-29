

# E-Commerce webapp (MERN stack)


| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img src="https://github.com/michaelc285/mern-ecommerce/blob/master/readmeImage/sample1.png?raw=true" width="400" alt="screen shot market landing"> Market Landing|  <img src="https://github.com/michaelc285/mern-ecommerce/blob/master/readmeImage/cartLanding.jpg?raw=true" width="400" alt="screen shot shopping cart"> Shopping Cart |<img src="https://raw.githubusercontent.com/michaelc285/mern-ecommerce/master/readmeImage/userControlPanel.jpg?raw=true" width="400" alt="screen shot shopping cart"> Users Control Panel||





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
## What I Learned
- OAuth 2.0, JWT token, RESTful API, MVC Pattern, NodeJS, TypeScript
- Frontend: React.js, React Hooks, Redux, Responsive 
- Backend: MongoDB Atlas, Express.js
- CSS Framework / UI: Tailwind CSS, Material-UI
## Objective 
- This project is a pratice for me to learn modern framework and webapp.

