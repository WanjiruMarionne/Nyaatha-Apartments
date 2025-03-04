# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



/* AboutUs.css */
.about-us-container {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    background-color: #f9f9f9;
  }
  
  .about-us-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #256c98;
    margin-bottom: 20px;
  }
  
  .subtitle {
    font-size: 2rem;
    font-weight: bold;
    color: #7FC31C;
    margin-top: 30px;
  }
  
  .about-div,
  .mission,
  .values,
  .vision {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 40px 20px;
  }
  
  .about-div img,
  .mission img,
  .values img,
  .vision img {
    width: 100%;
    max-width: 500px; /* Set max width for uniformity */
    height: 300px;  /* Set fixed height for all images */
    object-fit: cover; /* Ensure images maintain their aspect ratio */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .description-about,
  .description-mission,
  .description-vision {
    max-width: 600px;
    text-align: left;
    font-size: 1.2rem;
    line-height: 1.6;
    color: #333;
  }
  
  .feature-list {
    list-style: none;
    padding: 0;
    max-width: 600px;
    text-align: left;
  }
  
  .feature-item {
    font-size: 1.1rem;
    padding: 10px;
    border-left: 4px solid #256c98;
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  

  
  @media (max-width: 768px) {
    .about-div,
    .mission,
    .values,
    .vision {
      flex-direction: column;
      text-align: center;
    }
  
    .description-about,
    .description-mission,
    .description-vision {
      text-align: center;
    }
  }
  