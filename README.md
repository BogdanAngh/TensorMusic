# TensorMusic
### This is the project for the *NodeJS* optional class, first semester, third year, Faculty of Mathematics and Computer Science, University of Bucharest.

## Short description:

#### There are two types of users: *authenticated* and *non-authenticated*. A non-authenticated user can only generate beats, listen to them on the spot and save them locally (this feature is **unstable**). The authenticated user has the option to add any beat to his library, which he/she can access any time and listen to any of the saved beats.

#### The app supports all CRUD operations. In this manner, an *authenticated* user can create, view (listen to), update(the name of the beat) and delete a beat. A *non-authenticated* user can only create and view (listen to) a beat.


## What I have learned:
* ### Back-End
    1. Usage of the *express* module
    2. Linking the back-end to the database
    3. Organizing the data by using mongoDB models (with the aid of mongoose)
    4. Structuring the endpoints by using express router
    5. Usage of the *passport* module for authentication
    6. Securing the endpoints by using *JSON Web Tokens*
* ### Front-End
    1. Usage of React Components (the state object, component life cycle etc)
    2. Sending data to the back-end
    3. Receiving data from the back-end
    

## Short preview:

### Welcoming screen for an *authenticated* user
![welcomeauth](/docs/FrontScreenLoggedIn.jpeg)

### Main screen for an *authenticated* user
![mainauth](/docs/MainScreenLoggedIn.jpeg)

### Library screen
![library](/docs/LibraryScreen.jpeg)
