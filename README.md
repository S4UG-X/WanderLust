# WanderLust
First full Website

# Branches

initial-setup
routes
styling
validation
reviewModel

# Methods of How i am going to do this

1. did the basic setup in app.js (installed express, mongoose, ejs)
2. Then, created listing.js model and give it a demo value to check if the database is working or not
3. Creating init folder, where i could initialize my data. Store your 30 demo data here

after completed doing work in sub branch, then you merge remotely from the website, and after that you have to merge locally by typing: git pull origin main.
# Shortcut
Ctrl + j ==> to toggle between file and terminal
ctrl + shift + <> ==> to toggle between terminal
ctrl + h ==> to find and replace all at once


# Branch Route
created index route and show route
created create route, update route and their corrosponding ejs files.

# Branch styling
ejs-mate npm package for boilerplate.ejs
created /public/css/style.css
using bootstrap for Navbar.
linking cdn icons for icons
styling index.ejs, new.ejs and all other

# Branch validation
validate frontend by using Bootstrap
validate backend 
customError class
validate schema by Joi

# Branch reviewModel
create reviewModel and integrate with listing Model
add review form in show.ejs, just add it. connect it with listing model.
// First build the logic and then only go for styling.
do form validation frontend and backend.
go for styling
add delete Button
handeling deletion betweeen related collections

# Branch restruct
restructing Listing routes
restructing review routes

# Branch state 
It includes express-session and connect-flash
adding npm for session and for flash.

# Branch auth
Authorization and Authentication
User model
Add login, logout, sign up route in user.js
style the navbar.ejs
Add the owner to each listing and showing it in the show.ejs
Making sure that one user cannot delete the other user's listing both from frontend and backend
Do the same for Review

# Branch misc
Using Model, View, Controller Method
using router.route
Image upload (multer)
Connect database to remote mongo Atlas
Now upload to GitHub