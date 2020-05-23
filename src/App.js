import React, { Component } from 'react';

import { fetchData } from './Api';
import { Cards, Charts, CountrySelector } from './Components';
import styles from'./App.module.css';

// RELEVANT NOTES LOCATED AT THE BOTTOM - PLEASE SCROLL DOWN

class App extends Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
    //console.log(data);
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    
    this.setState({ data: fetchedData, country: country });
    // Fetch the data
    // Set the State
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <h1 style={{textAlign: 'center',
                    fontSize: '50px', 
                    color: 'rgb(88,88,88)'}}>COVID-19<br></br>TRACKER APP</h1>
        <Cards data={data}/>
        <CountrySelector handleCountryChange={this.handleCountryChange}/>
        <Charts data={data} country={country}/>
      </div>
    );
  } 
}

export default App;

/* NOTES ON HOW TO PREPARE FILES FOR DEPLOYMENT */
// Run the following command lines on terminal:
//    npm install --save axios react-chartjs-2 react-countup classnames
//    npm install --save @material-ui/core
//    npm install --save chart.js
//    npm add express express-favicon path

// Run the following command lines on terminal and paste numbers on package.json:
//    npm -v
//    node -v

// Paste the following string (replace x's with numbers) on package.json prior to 'dependencies'
/*"homepage": "/build",
  "engines": {
  "node": "xx.xx.x",
  "npm": "x.xx.x"
},*/

// The "scripts" block should look like the following:
/*"scripts": {
    "start": "node server.js",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }, */

// Get rid of Yarn.lock file ONLY, you can't have both package-lock.json and yarn
// ... in this case we are keeping the package-lock.json

// RUN THIS ON YOUR TERMINAL BEFORE deploying on Heroku: 
//    npm run build

/* EXTRA NOTES */
// A) https://material-ui.com
// B) Css files end in '.module.css' to avoid interference; and will prevent styles from 
//    other components to get applied on every file.
// C) Ways to structure app: you can work with class, or several functional components with hooks.
// D) On 'import { fetchData } from './Api';' you don't need to specify index.js since it will
//    automatically look for that file.
// E) The term 'await' is needed for asynchroneous functions.
// F) ComponentDidMount() is the best way to fetch data, but 'wait' needs to wrap an asynchroneous function
//    for lifecycle hook to work.
// G) The term 'async' goes in front of 'async componentDidMount()', for any other function put left to the parenthesis;
//    for instance: 'handleCountryChange = async (country)' 
// H) When render 'const { data } = this.state;' on App.js... BUT return '<Cards data={data}/>' on App.js to...
//    THEN on Cards.js file you can pass props too.
