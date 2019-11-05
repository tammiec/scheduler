# Interview Scheduler

Interview Scheduler is a client application created using `create-react-app`, and is used in conjunction with the [scheduler-api](https://github.com/tammiec/scheduler-api) server application. It allows students to create, edit, and delete interview appointments. It also communicates with other users with a WebSocket server so that all updates can be viewed in real-time by all connected users.

This project is part of the curriculum of the Lighthouse Labs Web Development Bootcamp.

## Final Product

#### Create a new Interview:

![New Interview](/docs/new-interview.gif)

#### Edit an Existing Interview:

![Edit Interview](/docs/edit-interview.gif)

#### Delete an Interview:

![Delete Interview](/docs/delete-interview.gif)

#### Updates appear for all connected users:

![Websockets](/docs/websockets.gif)


## Getting Started

This app is designed to be used in conjuction with the [scheduler-api](https://github.com/tammiec/scheduler-api). Please start the server for the scheduler-api prior to getting started.

1. Install dependencies using the `npm i` command.
2. Run the Webpack Development Server using the `npm start` command. The app will be served at <http://localhost:8000/>.
3. Optional: run the Jest Test Framework using the `npm test` command.
4. Go to <http://localhost:8000/> in your browser.

## Dependencies
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts
- @babel/core
- @storybook/addon-actions
- @storybook/addon-backgrounds
- @storybook/addon-links
- @storybook/addons
- @storybook/react
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/react-hooks
- babel-loader
- cypress
- node-sass
- prop-types
- react-test-renderer