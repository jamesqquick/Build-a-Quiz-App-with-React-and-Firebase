# Build a Quiz App with React and Firebase

![Cover Image](./images/cover.png)

## Intro and What We’ll Cover

We are going to build a Quiz app using React that enables saving of high scores in Firebase.This app will load random trivia questions from the Open Trivia DB API and allow users to run through x number of questions (typically 10) at a time.

## Create Initial Project using Create React App

For this project, we are going to use Create React App to generate a starter React application. We will also use the built in NPM commands to run and build our application. We will also be copying in pre-written CSS instead of writing styles along the way.

## Create Home Page

We will create the initial home page/component. It will display a title and have two buttons, one to play/take a quiz and the other to view high scores.

## Add React Router

For this application, our different pages (home, game, and high scores) are going to live on different routes. Since we need to show different components on different routes, we are going to use React Router. We will need to update our Home component to link to the Game and High Scores pages.

## Update Game Component With Static Data

We will create the initial game component and register it with React Router. We will then display dummy question data. We will load real question data in the following video.

## Load Questions using Fetch API

We will use the built in JavaScript Fetch API to retrieve questions from the Open Trivia DB API. We will need to convert the returned question data into the format we plan to work with. We will then load one of the questions to be displayed.

## Move Code to Questions Utility Class

We will take some of the logic for requesting and parsing question data out of the Game Component into its own helper file. This will help to minimize the size of the component itself. We will also change the display of the question to handle encoding issues by using dangerouslySetInnerHTML().

## Add an Animated Loader

It will take a small amount of time to retrieve questions from the API. Because of this, we will create and display an animated loader until the questions have been fully retrieved. We can use a throttle in the Chrome Developer tools to slow down the request to make sure the loader is visible.

## Add Logic to Change Questions

After retrieving a set of random questions from the API, we will add the logic to choose a random question to start with and change questions as the user answers each one.

## Add Answer Validation Logic

As the user answers each question, we will add logic to validate the answer. Based on the user’s answer, we will display a green or red background for correct and incorrect answers accordingly. In this section, we will introduce React Hooks. This will allow use to write these components as functional components instead of class based ones but still track state.

## Add Score Tracking Logic

As the user answers questions, we additionally need to keep track of the user’s score. This score will then be used when the user completes the quiz and optionally saves it to Firebase.

## Create Heads Up Display Components

We will create a few components to display information to the user about the state of the quiz. We will display the current question number as well as the score. We will create and display a progress bar component to show the user how far he/she has progressed through the quiz.

## Add Quiz Completed Logic

We will add the logic to track when the user has finished the quiz and set a “done” flag to be true. This flag will be used to conditionally show the save high score component in the next couple of videos.

## Create Save High Score Component

We will create the High Score component that the user will use to save his/her high score. This will be a simple form that displays the user’s name and then prompts for a username.

## Display High Score Component When Game Ends

We only want to display the High Score component when the user has finished the quiz, so we will add the logic to conditionally display the High Score component after the last question.

## Create Project in Firebase

We will create the Firebase project that we will interact with add and display high scores.

## Connect React Project to Firebase

We will set up our React application to be able to talk to Firebase.
Save High Scores to Firebase
We will add the logic to have the High Score component actually save high scores in the Firebase database. After the score has been saved, the user will be taken to the home screen.

## Display High Scores

With users being able to save their high scores, we now need to be able to display them. We will now make a request to the Firebase DB to retrieve and display real high scores.

## Convert Game Component to React Hooks

Since the game component is significantly more intensive than the other components, we did not write it using React Hooks initially. Now that you have a bit of experience with React Hooks from the other components, we will refactor this one to use React Hooks as well.

## Deploy to Netlify

We will create a new website in Netlify by connecting it to our github repository. We will then configure Netlify to build out site every time we push a change to the code. By hosting in Netlify, you can share your app with anyone across the world.

## Wrap Up and Where to Go From Here

We will recap what we covered in this series and talk about potential next steps and features you can add to your trivia game to go above and beyond.
