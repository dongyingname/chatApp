# Project: Chatty App

## By [Ying Dong](https://github.com/dongyingname)

## Description:

This is an online chat app that allows users to communicate by messages and sending pictures.

- No registration required!
- User-friendly interface: Clean interface and no advertisement!
- Shows number of users and usernames(optional) in colors.
- Compatible with URLs images in PNG, JPEG, and GIF format.

## Dependencies

chatApp
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- babel-preset-stage-0
- css-loader
- eslint
- eslint-plugin-react
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server

chatty_server(WebSocket Server)
- express
- websocket

## Getting Started

- to install all the dependencies.

```
$npm install
```
in each of the chatApp and chatty_server directory.

- To run the web server run the following command in terminal:

```
$npm start
```
in a sperated terminal for each of the chatApp and chatty_server directory.

- To view the ChattyApp page go to http://localhost:3000/.

## Instructions

- The image that is being posted can only be in png, jpeg, or gif format.
- The image URL has to be seperated from the rest of the message content by spaces in order to be properly rendered.

## Screenshots

![ChattyApp](./screenshots/chattyapp.png)

## Author

- [Ying Dong](https://github.com/dongyingname)
- 2-Month web design experience.
- Currently a Lighthouse Lab student.

## License

MIT.
