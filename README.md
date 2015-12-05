# mv-notes
This servise is a BBS api of tkool mv games on Heroku.
Edit allow domain of `index.js` and push heroku. if you want to use web game.
Add postgre sql add-on and create table `ddl.sql` by `heroku pg:psql` command.

# API
### GET /notes/:note_name/posts
Get 5 posts of note. if you wanna change limit. Edit `index.js`.

### POST /notes/:note_name/posts
Insert a post to note. data is all response body.

# LICENSE
The MIT License