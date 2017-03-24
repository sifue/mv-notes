# mv-notes

[![Join the chat at https://gitter.im/sifue/mv-notes](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sifue/mv-notes?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
This servise is a Notes(like a BBS) API for tkool mv games on Heroku.

# How to use
Add postgre sql add-on and create table `ddl.sql` by `heroku pg:psql` command.
Finally you implements tkool mv plugin for this Note api.

# Tkool MV plugins
- jquery.js
- MVNotes.js
Add these plugins by this order.

# Notes API
### GET /notes/:note_name/posts
Get 8 posts of note. if you wanna change limit. Edit `index.js`.

### POST /notes/:note_name/posts
Insert a post to note. data is all response body.

# LICENSE
MIT License