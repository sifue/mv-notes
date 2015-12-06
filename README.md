# mv-notes
This servise is a Notes(like a BBS) API for tkool mv games on Heroku.

# How to use
Edit allow domain of `index.js` and push heroku. if you want to use web game.
Add postgre sql add-on and create table `ddl.sql` by `heroku pg:psql` command.
Finally you implements tkool mv plugin for this Note api.

# Notes API
### GET /notes/:note_name/posts
Get 6 posts of note. if you wanna change limit. Edit `index.js`.

### POST /notes/:note_name/posts
Insert a post to note. data is all response body.

# LICENSE
MIT License