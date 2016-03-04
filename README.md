Summary:
  This app is useful for recording and tracking your tabletop RPG character sheets, the first iteration built with DnD 5e in mind. Not only are you able to keep a digital copy with this app, you can invite other players to a campaign for an easy Game Master overview of current character state.

Steps to install Char Sheets:
First:
```
npm install
```
Configuration:
For development, note the MongoDB connection string is used in two places for storing sessions to your mongo database.
The node module 'connect-mongodb-session' does need to create a second connection pool to achieve this


Technologies used:  
  -NodeJS
  -Express
  -MongoDB with mongoose
  -Twitter's Bootstrap

Technologies in the works:
  -Front end framework (most likely AngularJS)
  -PhantomJS for generating downloadable PDFs
