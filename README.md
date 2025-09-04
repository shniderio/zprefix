# How to use:
    User can create an account with the sign up button which will redirect you to a signup form.
    After account creation you will be redirected to the login page again.
    You can login to the page with the newly created user, or the seeded users.
    This page will render all your inventory if you have anything, if not it will say you don't have any items.
    You can add items to your inventory with the Add inventory button.
    You can also edit or delete items you have created in your inventory from this page.
    The browse all items button will redirect you to a list of all items made by everyone.
    If you are logged in you are able to delete any item as well.
    If you are not logged in you are only able to see them. The list contains all the information for all items and what user created them.
    You are able to logout with the logout button (obviously).

# How to start the app
    1. Open terminal and Navigate to api
        - 'npm i' to install require packages
        - 'npm run start' to run the api and express server
    2. Open new terminal and navigate to api
        - 'docker pull postgres'
        - 'docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres'
        - 'docker ps -a' to see the name of the docker container
        - 'docker exec -it pg-docker bash
        - 'psql -U postgres' to log in with the username 
        - 'create database inventory;' to create the required database for the app to run 
    3. Open new terminal and navigate to ui/zprefix-react-app
        - 'npm i'
        - 'npm run dev'
        - open link to use app
    4. Open new terminal and navigate to api
        - 'npx knex migrate:latest'
        - 'npx knex seed:run'
    5. When you are on the app, you are able to navigate and use the app. 
        - sign up will let you create an account
        - you can log in with the created account or use 'user1' and 'password1'
        - when you hit submit you are redirected to the users inventory where you can view, create, edit, and delete items
        - you can click the browse all items button to see everything created and delete them if you are logged in.
        - you can hit the back button on this page to return to your inventory.
        - you can hit the logout button to return to the login page. 
        - you can then navigate to the browse all items button as an unauthed user to view the items but cannot delete.