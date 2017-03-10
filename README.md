# WDI_PROJECT_4_CLIENT

Case study of my fourth project made for GA.

Create a MEAN app with user authentication and deploy it to Heroku.

<a href="http://cards-a-h.herokuapp.com/" target="_blank">DEMO</a> &nbsp; &nbsp; &nbsp;

<a href="https://github.com/EffingKay/WDI_PROJECT_4_API" target="_blank">API for this project</a> &nbsp; &nbsp; &nbsp;

## What was used

AngularJS and SASS were used for client side styling, while Ruby and Ruby on Rails with PostgreSQL were used on server side.

Gulp was used as task runner.

I used angular-actioncable package to connect client side with API.

## Overview

![screen shot 2017-03-06 at 17 01 01](https://cloud.githubusercontent.com/assets/20258758/23620736/e5522636-028f-11e7-8d6f-008c25c99b4f.png)

For the final project at GA I set myself up with a challenge. I knew I wanted to try a technology I haven’t used before and I wanted to create a game instead of just a web site. After a pitch to my instructor, the project was decided - I was creating a real-time multi player game of Cards Against Humanity.
It seemed like a perfect project, I got to use something new - ActionCable, which connects players and makes changes to the app in real time without the need to refresh the page. I started by learning more about WebSocket and ActionCable, I spent entire weekend researching and planning out the game and in process I created a few chat apps. Once I felt comfortable with my plan, I started coding. I had a working connection within couple of days and I spent the rest of the week working on game logic. Within the timeframe I was given I created a basic version of the game.

After user logs in he is redirected to the game index page where he can choose a pecific game or create a new one.

![screen shot 2017-03-06 at 17 01 57](https://cloud.githubusercontent.com/assets/20258758/23620734/e550afa4-028f-11e7-9415-b9cf477016c2.png)

After a new room is created, a black card is randomly generated and is the same for all the users connected to the room as it was saved in the database with the room. Every players is then dealt 10 white cards which he can play with. 

![screen shot 2017-03-06 at 17 05 24](https://cloud.githubusercontent.com/assets/20258758/23620735/e5522960-028f-11e7-8bd4-653b8a564366.png) 

![screen shot 2017-03-06 at 17 05 43](https://cloud.githubusercontent.com/assets/20258758/23620731/e54ecbbc-028f-11e7-9829-23b7eea48d0a.png)

Once a player chooses his white cards and plays it, it gets saved into the database alongside the user id so if the player returns to the room, he cannot play again. After the move, the player can vote for the funniest card. Player has an option to vote for several cards, not just one. The cards are then sorted from the most popular to the least popular.

![screen shot 2017-03-06 at 17 06 58](https://cloud.githubusercontent.com/assets/20258758/23620733/e5507cdc-028f-11e7-9206-13eaee99e39f.png)

I used ActionCable for this project, meaning the game is realtime. When in the same room, players can see all the moves the other players made as soon as they happened. It works on the same principle as a chat or messaging app.

![screen shot 2017-03-06 at 17 08 05](https://cloud.githubusercontent.com/assets/20258758/23620732/e54f1216-028f-11e7-9a0b-02c83aec3835.png)


## What was a challenge?
ActionCable and BrowserSync didn't work together well. It was also a first project for me, in which I used Ruby on Rails and PostgreSQL, which for me personally proved more challenging than MongoDB I used before. 

## Known issues
- after logging in, the page needs to be refreshed because the app doesn't recognise the user until you do
