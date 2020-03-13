## Methodology

Based on the project requirements this sounded exactly like a To Do application, so that's the direction I headed in terms of naming and labelling everything.

I initially used Create React App with the TypeScript template to generate my project, and shortly after that discovered the [Redux+TypeScript](https://github.com/reduxjs/cra-template-redux-typescript) template (which seems to have just been released), so I ended up re-initializing the project with that template.

I implemented redux in my components and tests following the patterns laid out in the CRA template I used, which were quite verbose, but I also see how it's a very powerful system. I didn't end up writing any asynchronous tests because it wasn't necessary for my application.

I chose to use SCSS and manually implement a light styling instead of using something like Bootstrap or React Material because I wanted to have a nice custom interface without fighting with a framework, and my application is not complex enough to require most of the boilerplate those frameworks provide.

## Future changes

Something that I really wanted to do but couldn't due to time restrictions on this project was to create a separate library with each of the components in it, and `npm install/link` it into this project so as to have a separation of concerns from the app logic and the actuall stateless components such as the `ToDoItem`, `AddToDo`, and the sort and visibility components.

I would also like to add edit functionality to each To Do, as well as "Clear Completed" and "Clear All" buttons (with warning prompts).

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
