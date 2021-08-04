# can-tool-be

# Register a User:
Local endpoint: http://localhost:5000/api/auth/register
Prod endpoint:
request: post
body:
    {
        "username": "string (not nullable)",
        "password": "string (not nullable)"
    }

returns a user object with an id, username & hashed password. Also returns a jwt that's required to access other endpoints.

# Log a user in:
Local endpoint: http://localhost:5000/api/auth/login
endpoint:
request: post
body:
    {
        "username": "string (not nullable)",
        "password": "string (not nullable)"
    }

returns a user object with an id, username. Also returns a jwt that's required to access other endpoints.


# Add a can:
Local endpoint: http://localhost:5000/api/cans/new-can/:user-id
endpoint:
request: post

body:
    {
        "can_name": "string (not nullable)",
        "can_text": "string (not nullable)"
    }

Takes in the user_id as params then returns a new can with an attached can_id & user_id


# Delete a can
Local endpoint: http://localhost:5000/api/cans/delete-can/:id
endpoint:
request: delete

Takes a can's id in as params and will delete that object from the db if it exists.


# Update can
Local endpoint: http://localhost:5000/api/cans/update-can/:id
endpoint:
request: put

body:
    {
        "can_name": "string (not nullable)",
        "can_text": "string (not nullable)"
    }

Takes in the can's id as prams and will update any provided fields on that object. The updated object will be returned in the response.



# deployment instructions


<!-- Directions coming soon, these are outdated ensure all environment objects are configured on heroku
add the heroku-postgresql add on (if not done already)
git push heroku master
heroku config | grep HEROKU_POSTGRESQL
heroku run knex migrate:rollback
heroku run knex migrate:latest -->

